# Parse XML data

Extensible Markup Language (XML) is a set of rules for encoding documents in machine-readable form. XML is a popular format for sharing data on the internet. Websites that frequently update their content, such as news sites or blogs, often provide an XML feed so that external programs can keep abreast of content changes. Uploading and parsing XML data is a common task for network-connected apps. This lesson explains how to parse XML documents and use their data.

To learn more about creating web-based content in your Android app, see Web apps.

Choose a parser
---------------

We recommend `XmlPullParser`, which is an efficient and maintainable way to parse XML on Android. Historically Android has had two implementations of this interface:

*   `KXmlParser` via `XmlPullParserFactory.newPullParser()`.
*   `ExpatPullParser`, via `Xml.newPullParser()`.

Either choice is fine. The example in this section uses `ExpatPullParser`, via `Xml.newPullParser()`.

Analyze the feed
----------------

The first step in parsing a feed is to decide which fields you're interested in. The parser extracts data for those fields and ignores the rest.

Here is an excerpt from the feed that's being parsed in the sample app. Each post to StackOverflow.com appears in the feed as an `entry` tag that contains several nested tags:

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:creativeCommons="http://backend.userland.com/creativeCommonsRssModule" ...">
<title type="text">newest questions tagged android - Stack Overflow</title>
...
    <entry>
    ...
    </entry>
    <entry>
        <id>http://stackoverflow.com/q/9439999</id>
        <re:rank scheme="http://stackoverflow.com">0</re:rank>
        <title type="text">Where is my data file?</title>
        <category scheme="http://stackoverflow.com/feeds/tag?tagnames=android&sort=newest/tags" term="android"/>
        <category scheme="http://stackoverflow.com/feeds/tag?tagnames=android&sort=newest/tags" term="file"/>
        <author>
            <name>cliff2310</name>
            <uri>http://stackoverflow.com/users/1128925</uri>
        </author>
        <link rel="alternate" href="http://stackoverflow.com/questions/9439999/where-is-my-data-file" />
        <published>2012-02-25T00:30:54Z</published>
        <updated>2012-02-25T00:30:54Z</updated>
        <summary type="html">
            <p>I have an Application that requires a data file...</p>

        </summary>
    </entry>
    <entry>
    ...
    </entry>
...
</feed>
```

The sample app extracts data for the `entry` tag and its nested tags `title`, `link`, and `summary`.

Instantiate the parser
----------------------

The next step is to instantiate a parser and kick off the parsing process. In this snippet, a parser is initialized to not process namespaces, and to use the provided `InputStream` as its input. It starts the parsing process with a call to `nextTag()` and invokes the `readFeed()` method, which extracts and processes the data the app is interested in:

### Kotlin

```kotlin
// We don't use namespaces
private val ns: String? = null

class StackOverflowXmlParser {

    @Throws(XmlPullParserException::class, IOException::class)
    fun parse(inputStream: InputStream): List<*> {
        inputStream.use { inputStream ->
            val parser: XmlPullParser = Xml.newPullParser()
            parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false)
            parser.setInput(inputStream, null)
            parser.nextTag()
            return readFeed(parser)
        }
    }
 ...
}
```

### Java

```java
public class StackOverflowXmlParser {
    // We don't use namespaces
    private static final String ns = null;

    public List parse(InputStream in) throws XmlPullParserException, IOException {
        try {
            XmlPullParser parser = Xml.newPullParser();
            parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            parser.setInput(in, null);
            parser.nextTag();
            return readFeed(parser);
        } finally {
            in.close();
        }
    }
 ...
}
```

Read the feed
-------------

The `readFeed()` method does the actual work of processing the feed. It looks for elements tagged "entry" as a starting point for recursively processing the feed. If a tag isn't an `entry` tag, it skips it. Once the whole feed has been recursively processed, `readFeed()` returns a `List` containing the entries (including nested data members) it extracted from the feed. This `List` is then returned by the parser.

### Kotlin

```kotlin
@Throws(XmlPullParserException::class, IOException::class)
private fun readFeed(parser: XmlPullParser): List<Entry> {
    val entries = mutableListOf<Entry>()

    parser.require(XmlPullParser.START_TAG, ns, "feed")
    while (parser.next() != XmlPullParser.END_TAG) {
        if (parser.eventType != XmlPullParser.START_TAG) {
            continue
        }
        // Starts by looking for the entry tag
        if (parser.name == "entry") {
            entries.add(readEntry(parser))
        } else {
            skip(parser)
        }
    }
    return entries
}
```

### Java

```java
private List readFeed(XmlPullParser parser) throws XmlPullParserException, IOException {
    List entries = new ArrayList();

    parser.require(XmlPullParser.START_TAG, ns, "feed");
    while (parser.next() != XmlPullParser.END_TAG) {
        if (parser.getEventType() != XmlPullParser.START_TAG) {
            continue;
        }
        String name = parser.getName();
        // Starts by looking for the entry tag
        if (name.equals("entry")) {
            entries.add(readEntry(parser));
        } else {
            skip(parser);
        }
    }
    return entries;
}
```

Parse XML
---------

The steps for parsing an XML feed are as follows:

1.  As described in Analyze the feed, identify the tags you want to include in your app. This example extracts data for the `entry` tag and its nested tags `title`, `link`, and `summary`.
2.  Create the following methods:
    *   A "read" method for each tag you're interested in. For example, `readEntry()`, `readTitle()`, and so on. The parser reads tags from the input stream. When it encounters a tag named `entry`, `title`, `link` or `summary`, it calls the appropriate method for that tag. Otherwise, it skips the tag.
    *   Methods to extract data for each different type of tag and to advance the parser to the next tag. For example:
        *   For the `title` and `summary` tags, the parser calls `readText()`. This method extracts data for these tags by calling `parser.getText()`.
        *   For the `link` tag, the parser extracts data for links by first determining if the link is the kind it's interested in. Then it uses `parser.getAttributeValue()` to extract the link's value.
        *   For the `entry` tag, the parser calls `readEntry()`. This method parses the entry's nested tags and returns an `Entry` object with the data members `title`, `link`, and `summary`.
    *   A helper `skip()` method that's recursive. For more discussion of this topic, see Skip Tags You Don't Care About.

This snippet shows how the parser parses entries, titles, links, and summaries.

### Kotlin

```kotlin
data class Entry(val title: String?, val summary: String?, val link: String?)

// Parses the contents of an entry. If it encounters a title, summary, or link tag, hands them off
// to their respective "read" methods for processing. Otherwise, skips the tag.
@Throws(XmlPullParserException::class, IOException::class)
private fun readEntry(parser: XmlPullParser): Entry {
    parser.require(XmlPullParser.START_TAG, ns, "entry")
    var title: String? = null
    var summary: String? = null
    var link: String? = null
    while (parser.next() != XmlPullParser.END_TAG) {
        if (parser.eventType != XmlPullParser.START_TAG) {
            continue
        }
        when (parser.name) {
            "title" -> title = readTitle(parser)
            "summary" -> summary = readSummary(parser)
            "link" -> link = readLink(parser)
            else -> skip(parser)
        }
    }
    return Entry(title, summary, link)
}

// Processes title tags in the feed.
@Throws(IOException::class, XmlPullParserException::class)
private fun readTitle(parser: XmlPullParser): String {
    parser.require(XmlPullParser.START_TAG, ns, "title")
    val title = readText(parser)
    parser.require(XmlPullParser.END_TAG, ns, "title")
    return title
}

// Processes link tags in the feed.
@Throws(IOException::class, XmlPullParserException::class)
private fun readLink(parser: XmlPullParser): String {
    var link = ""
    parser.require(XmlPullParser.START_TAG, ns, "link")
    val tag = parser.name
    val relType = parser.getAttributeValue(null, "rel")
    if (tag == "link") {
        if (relType == "alternate") {
            link = parser.getAttributeValue(null, "href")
            parser.nextTag()
        }
    }
    parser.require(XmlPullParser.END_TAG, ns, "link")
    return link
}

// Processes summary tags in the feed.
@Throws(IOException::class, XmlPullParserException::class)
private fun readSummary(parser: XmlPullParser): String {
    parser.require(XmlPullParser.START_TAG, ns, "summary")
    val summary = readText(parser)
    parser.require(XmlPullParser.END_TAG, ns, "summary")
    return summary
}

// For the tags title and summary, extracts their text values.
@Throws(IOException::class, XmlPullParserException::class)
private fun readText(parser: XmlPullParser): String {
    var result = ""
    if (parser.next() == XmlPullParser.TEXT) {
        result = parser.text
        parser.nextTag()
    }
    return result
}
...
```

### Java

```java
public static class Entry {
    public final String title;
    public final String link;
    public final String summary;

    private Entry(String title, String summary, String link) {
        this.title = title;
        this.summary = summary;
        this.link = link;
    }
}

// Parses the contents of an entry. If it encounters a title, summary, or link tag, hands them off
// to their respective "read" methods for processing. Otherwise, skips the tag.
private Entry readEntry(XmlPullParser parser) throws XmlPullParserException, IOException {
    parser.require(XmlPullParser.START_TAG, ns, "entry");
    String title = null;
    String summary = null;
    String link = null;
    while (parser.next() != XmlPullParser.END_TAG) {
        if (parser.getEventType() != XmlPullParser.START_TAG) {
            continue;
        }
        String name = parser.getName();
        if (name.equals("title")) {
            title = readTitle(parser);
        } else if (name.equals("summary")) {
            summary = readSummary(parser);
        } else if (name.equals("link")) {
            link = readLink(parser);
        } else {
            skip(parser);
        }
    }
    return new Entry(title, summary, link);
}

// Processes title tags in the feed.
private String readTitle(XmlPullParser parser) throws IOException, XmlPullParserException {
    parser.require(XmlPullParser.START_TAG, ns, "title");
    String title = readText(parser);
    parser.require(XmlPullParser.END_TAG, ns, "title");
    return title;
}

// Processes link tags in the feed.
private String readLink(XmlPullParser parser) throws IOException, XmlPullParserException {
    String link = "";
    parser.require(XmlPullParser.START_TAG, ns, "link");
    String tag = parser.getName();
    String relType = parser.getAttributeValue(null, "rel");
    if (tag.equals("link")) {
        if (relType.equals("alternate")){
            link = parser.getAttributeValue(null, "href");
            parser.nextTag();
        }
    }
    parser.require(XmlPullParser.END_TAG, ns, "link");
    return link;
}

// Processes summary tags in the feed.
private String readSummary(XmlPullParser parser) throws IOException, XmlPullParserException {
    parser.require(XmlPullParser.START_TAG, ns, "summary");
    String summary = readText(parser);
    parser.require(XmlPullParser.END_TAG, ns, "summary");
    return summary;
}

// For the tags title and summary, extracts their text values.
private String readText(XmlPullParser parser) throws IOException, XmlPullParserException {
    String result = "";
    if (parser.next() == XmlPullParser.TEXT) {
        result = parser.getText();
        parser.nextTag();
    }
    return result;
}
  ...
}
```

Skip tags you don't care about
------------------------------

One of the steps in the XML parsing described above is for the parser to skip tags it's not interested in. Here is the parser's `skip()` method:

### Kotlin

```kotlin
@Throws(XmlPullParserException::class, IOException::class)
private fun skip(parser: XmlPullParser) {
    if (parser.eventType != XmlPullParser.START_TAG) {
        throw IllegalStateException()
    }
    var depth = 1
    while (depth != 0) {
        when (parser.next()) {
            XmlPullParser.END_TAG -> depth--
            XmlPullParser.START_TAG -> depth++
        }
    }
}
```

### Java

```java
private void skip(XmlPullParser parser) throws XmlPullParserException, IOException {
    if (parser.getEventType() != XmlPullParser.START_TAG) {
        throw new IllegalStateException();
    }
    int depth = 1;
    while (depth != 0) {
        switch (parser.next()) {
        case XmlPullParser.END_TAG:
            depth--;
            break;
        case XmlPullParser.START_TAG:
            depth++;
            break;
        }
    }
 }
```

This is how it works:

*   It throws an exception if the current event isn't a `START_TAG`.
*   It consumes the `START_TAG`, and all events up to and including the matching `END_TAG`.
*   To make sure that it stops at the correct `END_TAG` and not at the first tag it encounters after the original `START_TAG`, it keeps track of the nesting depth.

Thus if the current element has nested elements, the value of `depth` won't be 0 until the parser has consumed all events between the original `START_TAG` and its matching `END_TAG`. For example, consider how the parser skips the `<author>` element, which has 2 nested elements, `<name>` and `<uri>`:

*   The first time through the `while` loop, the next tag the parser encounters after `<author>` is the `START_TAG` for `<name>`. The value for `depth` is incremented to 2.
*   The second time through the `while` loop, the next tag the parser encounters is the `END_TAG` `</name>`. The value for `depth` is decremented to 1.
*   The third time through the `while` loop, the next tag the parser encounters is the `START_TAG` `<uri>`. The value for `depth` is incremented to 2.
*   The fourth time through the `while` loop, the next tag the parser encounters is the `END_TAG` `</uri>`. The value for `depth` is decremented to 1.
*   The fifth time and final time through the `while` loop, the next tag the parser encounters is the `END_TAG` `</author>`. The value for `depth` is decremented to 0, indicating that the `<author>` element has been successfully skipped.

Consume XML data
----------------

The example application fetches and parses the XML feed within an `AsyncTask`. This takes the processing off the main UI thread. When processing is complete, the app updates the UI in the main activity (`NetworkActivity`).

In the excerpt shown below, the `loadPage()` method does the following:

*   Initializes a string variable with the URL for the XML feed.
*   If the user's settings and the network connection allow it, invokes `new DownloadXmlTask().execute(url)`. This instantiates a new `DownloadXmlTask` object (`AsyncTask` subclass) and runs its `execute()` method, which downloads and parses the feed and returns a string result to be displayed in the UI.

### Kotlin

```kotlin
class NetworkActivity : Activity() {

    companion object {

        const val WIFI = "Wi-Fi"
        const val ANY = "Any"
        const val SO_URL = "http://stackoverflow.com/feeds/tag?tagnames=android&sort=newest"
        // Whether there is a Wi-Fi connection.
        private var wifiConnected = false
        // Whether there is a mobile connection.
        private var mobileConnected = false

        // Whether the display should be refreshed.
        var refreshDisplay = true
        // The user's current network preference setting.
        var sPref: String? = null
    }

    ...

    // Uses AsyncTask subclass to download the XML feed from stackoverflow.com.
    // Uses AsyncTask to download the XML feed from stackoverflow.com.
    fun loadPage() {

        if (sPref.equals(ANY) && (wifiConnected || mobileConnected)) {
            DownloadXmlTask().execute(SO_URL)
        } else if (sPref.equals(WIFI) && wifiConnected) {
            DownloadXmlTask().execute(SO_URL)
        } else {
            // show error
        }
    }

    ...
}
```

### Java

```java
public class NetworkActivity extends Activity {
    public static final String WIFI = "Wi-Fi";
    public static final String ANY = "Any";
    private static final String URL = "http://stackoverflow.com/feeds/tag?tagnames=android&sort=newest";

    // Whether there is a Wi-Fi connection.
    private static boolean wifiConnected = false;
    // Whether there is a mobile connection.
    private static boolean mobileConnected = false;
    // Whether the display should be refreshed.
    public static boolean refreshDisplay = true;
    public static String sPref = null;

    ...

    // Uses AsyncTask to download the XML feed from stackoverflow.com.
    public void loadPage() {

        if((sPref.equals(ANY)) && (wifiConnected || mobileConnected)) {
            new DownloadXmlTask().execute(URL);
        }
        else if ((sPref.equals(WIFI)) && (wifiConnected)) {
            new DownloadXmlTask().execute(URL);
        } else {
            // show error
        }
    }
```

The `AsyncTask` subclass shown below, `DownloadXmlTask`, implements the following `AsyncTask` methods:

*   `doInBackground()` executes the method `loadXmlFromNetwork()`. It passes the feed URL as a parameter. The method `loadXmlFromNetwork()` fetches and processes the feed. When it finishes, it passes back a result string.
*   `onPostExecute()` takes the returned string and displays it in the UI.

### Kotlin

```kotlin
// Implementation of AsyncTask used to download XML feed from stackoverflow.com.
private inner class DownloadXmlTask : AsyncTask<String, Void, String>() {
    override fun doInBackground(vararg urls: String): String {
        return try {
            loadXmlFromNetwork(urls[0])
        } catch (e: IOException) {
            resources.getString(R.string.connection_error)
        } catch (e: XmlPullParserException) {
            resources.getString(R.string.xml_error)
        }
    }

    override fun onPostExecute(result: String) {
        setContentView(R.layout.main)
        // Displays the HTML string in the UI via a WebView
        findViewById<WebView>(R.id.webview)?.apply {
            loadData(result, "text/html", null)
        }
    }
}
```

### Java

```java
// Implementation of AsyncTask used to download XML feed from stackoverflow.com.
private class DownloadXmlTask extends AsyncTask<String, Void, String> {
    @Override
    protected String doInBackground(String... urls) {
        try {
            return loadXmlFromNetwork(urls[0]);
        } catch (IOException e) {
            return getResources().getString(R.string.connection_error);
        } catch (XmlPullParserException e) {
            return getResources().getString(R.string.xml_error);
        }
    }

    @Override
    protected void onPostExecute(String result) {
        setContentView(R.layout.main);
        // Displays the HTML string in the UI via a WebView
        WebView myWebView = (WebView) findViewById(R.id.webview);
        myWebView.loadData(result, "text/html", null);
    }
}
```

Below is the method `loadXmlFromNetwork()` that is invoked from `DownloadXmlTask`. It does the following:

1.  Instantiates a `StackOverflowXmlParser`. It also creates variables for a `List` of `Entry` objects (`entries`), and `title`, `url`, and `summary`, to hold the values extracted from the XML feed for those fields.
2.  Calls `downloadUrl()`, which fetches the feed and returns it as an `InputStream`.
3.  Uses `StackOverflowXmlParser` to parse the `InputStream`. `StackOverflowXmlParser` populates a `List` of `entries` with data from the feed.
4.  Processes the `entries` `List`, and combines the feed data with HTML markup.
5.  Returns an HTML string that is displayed in the main activity UI by the `AsyncTask` method `onPostExecute()`.

### Kotlin

```kotlin
// Uploads XML from stackoverflow.com, parses it, and combines it with
// HTML markup. Returns HTML string.
@Throws(XmlPullParserException::class, IOException::class)
private fun loadXmlFromNetwork(urlString: String): String {
    // Checks whether the user set the preference to include summary text
    val pref: Boolean = PreferenceManager.getDefaultSharedPreferences(this)?.run {
        getBoolean("summaryPref", false)
    } ?: false

    val entries: List<Entry> = downloadUrl(urlString)?.use { stream ->
        // Instantiate the parser
        StackOverflowXmlParser().parse(stream)
    } ?: emptyList()

    return StringBuilder().apply {
        append("<h3>${resources.getString(R.string.page_title)}</h3>")
        append("<em>${resources.getString(R.string.updated)} ")
        append("${formatter.format(rightNow.time)}</em>")
        // StackOverflowXmlParser returns a List (called "entries") of Entry objects.
        // Each Entry object represents a single post in the XML feed.
        // This section processes the entries list to combine each entry with HTML markup.
        // Each entry is displayed in the UI as a link that optionally includes
        // a text summary.
        entries.forEach { entry ->
            append("<p><a href='")
            append(entry.link)
            append("'>" + entry.title + "</a></p>")
            // If the user set the preference to include summary text,
            // adds it to the display.
            if (pref) {
                append(entry.summary)
            }
        }
    }.toString()
}

// Given a string representation of a URL, sets up a connection and gets
// an input stream.
@Throws(IOException::class)
private fun downloadUrl(urlString: String): InputStream? {
    val url = URL(urlString)
    return (url.openConnection() as? HttpURLConnection)?.run {
        readTimeout = 10000
        connectTimeout = 15000
        requestMethod = "GET"
        doInput = true
        // Starts the query
        connect()
        inputStream
    }
}
```

### Java

```java
// Uploads XML from stackoverflow.com, parses it, and combines it with
// HTML markup. Returns HTML string.
private String loadXmlFromNetwork(String urlString) throws XmlPullParserException, IOException {
    InputStream stream = null;
    // Instantiate the parser
    StackOverflowXmlParser stackOverflowXmlParser = new StackOverflowXmlParser();
    List<Entry> entries = null;
    String title = null;
    String url = null;
    String summary = null;
    Calendar rightNow = Calendar.getInstance();
    DateFormat formatter = new SimpleDateFormat("MMM dd h:mmaa");

    // Checks whether the user set the preference to include summary text
    SharedPreferences sharedPrefs = PreferenceManager.getDefaultSharedPreferences(this);
    boolean pref = sharedPrefs.getBoolean("summaryPref", false);

    StringBuilder htmlString = new StringBuilder();
    htmlString.append("<h3>" + getResources().getString(R.string.page_title) + "</h3>");
    htmlString.append("<em>" + getResources().getString(R.string.updated) + " " +
            formatter.format(rightNow.getTime()) + "</em>");

    try {
        stream = downloadUrl(urlString);
        entries = stackOverflowXmlParser.parse(stream);
    // Makes sure that the InputStream is closed after the app is
    // finished using it.
    } finally {
        if (stream != null) {
            stream.close();
        }
     }

    // StackOverflowXmlParser returns a List (called "entries") of Entry objects.
    // Each Entry object represents a single post in the XML feed.
    // This section processes the entries list to combine each entry with HTML markup.
    // Each entry is displayed in the UI as a link that optionally includes
    // a text summary.
    for (Entry entry : entries) {
        htmlString.append("<p><a href='");
        htmlString.append(entry.link);
        htmlString.append("'>" + entry.title + "</a></p>");
        // If the user set the preference to include summary text,
        // adds it to the display.
        if (pref) {
            htmlString.append(entry.summary);
        }
    }
    return htmlString.toString();
}

// Given a string representation of a URL, sets up a connection and gets
// an input stream.
private InputStream downloadUrl(String urlString) throws IOException {
    URL url = new URL(urlString);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setReadTimeout(10000 /* milliseconds */);
    conn.setConnectTimeout(15000 /* milliseconds */);
    conn.setRequestMethod("GET");
    conn.setDoInput(true);
    // Starts the query
    conn.connect();
    return conn.getInputStream();
}
```