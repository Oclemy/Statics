# How to Parse TrueType Fonts - Android Solutions


You may wish to parse your ttf fonts. In this tutorial you will explore solutions for parsing True Type Fonts(ttf). This type of font is the most common format for fonts on major operating systems. But first what is a True Type Font?


> TrueType is an outline font standard developed by Apple in the late 1980s as a competitor to Adobe's Type 1 fonts used in PostScript.

Here are the solutions to use:

## (a). TrueTypeParser

> This is a TrueType Font Parser for Android based on [Apache FOP](http://xmlgraphics.apache.org/fop/).

### Step 1: Installation

Install it using the following implementation statement:

```groovy
implementation 'com.jaredrummler:truetypeparser:1.0.0'
```

Or you can [grab the AAR](https://repo1.maven.org/maven2/com/jaredrummler/truetypeparser/1.0.0/truetypeparser-1.0.0.aar) file.

### Step 2: Usage

Let's say your fonts are located in the assets folder. Load it using the `TTFFile.open()`method, as follows:

```java
TTFFile ttfFile = TTFFile.open(getAssets().open("fonts/your-font.ttf"));
```

You can get the details of the font as follows:

```java
String name = ttfFile.getFullName();
String family = ttfFile.getSubFamilyName();
int fontWeight = ttfFile.getWeightClass();
String copyright = ttfFile.getCopyrightNotice();
Map<Integer, Map<Integer, Integer>> kerning = ttfFile.getKerning();
```

### Full Example

Start by installing the library as has been discussed above,

Then design your layout:

**content_main.xml**

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.jaredrummler.truetype.sample.MainActivity"
    tools:showIn="@layout/activity_main">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"/>
</RelativeLayout>
```

Then replace your main activity with the following code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
    fab.setOnClickListener(new View.OnClickListener() {

      @Override public void onClick(View view) {
        showFontInfo("font.ttf");
      }
    });
  }

  @Override public boolean onCreateOptionsMenu(Menu menu) {
    // Inflate the menu; this adds items to the action bar if it is present.
    getMenuInflater().inflate(R.menu.menu_main, menu);
    return true;
  }

  @Override public boolean onOptionsItemSelected(MenuItem item) {
    // Handle action bar item clicks here. The action bar will
    // automatically handle clicks on the Home/Up button, so long
    // as you specify a parent activity in AndroidManifest.xml.
    int id = item.getItemId();

    //noinspection SimplifiableIfStatement
    if (id == R.id.action_settings) {
      return true;
    }

    return super.onOptionsItemSelected(item);
  }

  private void showFontInfo(String asset) {
    new AsyncTask<String, Void, List<String[]>>() {

      @Override protected List<String[]> doInBackground(String... params) {
        List<String[]> properties = new ArrayList<>();

        try {
          TTFFile ttfFile = TTFFile.open(getAssets().open(params[0]));

          properties.add(new String[]{"NAME", ttfFile.getFullName()});
          properties.add(new String[]{"POST SCRIPT NAME", ttfFile.getPostScriptName()});
          properties.add(new String[]{"FAMILIES", Arrays.toString(ttfFile.getFamilyNames().toArray())});
          properties.add(new String[]{"SUB FAMILY", ttfFile.getSubFamilyName()});
          properties.add(new String[]{"WEIGHT", String.valueOf(ttfFile.getWeightClass())});
          properties.add(new String[]{"NOTICE", ttfFile.getCopyrightNotice()});

        } catch (IOException e) {
          e.printStackTrace();
        }

        return properties;
      }

      @Override protected void onPostExecute(List<String[]> properties) {
        if (isFinishing()) {
          return;
        }
        StringBuilder html = new StringBuilder();
        for (String[] property : properties) {
          html.append("<strong>")
              .append(property[0])
              .append(":</strong>")
              .append(' ')
              .append(property[1])
              .append("<br><br>");
        }
        new AlertDialog.Builder(MainActivity.this)
            .setTitle("Font properties")
            .setMessage(Html.fromHtml(html.toString()))
            .setPositiveButton(android.R.string.ok, null)
            .show();
      }

    }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, asset);
  }

}
```

### Reference

Find project links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/jaredrummler/TrueTypeParser/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/jaredrummler/) code author |
