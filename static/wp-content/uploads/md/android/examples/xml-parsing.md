# XML Parsing using XmlPullParser, DocumentBuilder and SAXParser


Learn how to parse and render XML documents on a listview using the following example.


## Example 1: XMLParsing using XmlPullParser, DocumentBuilder and SAXParser

This example is written in Java Programming Language. In this tutorial you will learn about how to parse XML using the three main techniques or classes in Android:

1. Parsing XML using the `XmlPullParser`.
2. Parsing XML using the `DocumentBuilder` of `DomParser`.
3. Parsing XML using the `SAXParser`.
4. Render the parsed XML on a ListView.

### Step 1: Create Project

1. Open your `Android Studio` IDE.
2. In the menu go to `File --> Create New Project`.
3. Choose `Empty Project` template.

### Step 2: Add Dependencies

No external dependencies are needed for this project.

### Step 3: Design Layouts

Go to your `res/layout` directory so as to design your user interface.

We will have 2 layouts:

1. activity_main.xml
2. list_item.xml

First create a file known as `activity_main.xml` and add the following code:

**(a). activity_main.xml**

This is the `MainActivity` layout. Add a `ListView` and three buttons. One button for parsing via `XmlPullParser`, one for parsing via `SaxParser` and the other for parsing via `DomParser`. Once the XML is parsed data will be rendered in the `ListView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ListView
        android:id="@+id/listview"
        app:layout_constraintTop_toBottomOf="@id/linelayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp">

    </ListView>
    <LinearLayout
        android:id="@+id/linelayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="5dp">
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/pull"
            android:layout_weight="1"
            android:layout_margin="10dp"
            android:text="@string/pull_parser"/>
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/saxparser"
            android:layout_weight="1"
            android:layout_margin="10dp"
            android:text="@string/sax_parser"/>
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/domparser"
            android:layout_weight="1"
            android:layout_margin="10dp"
            android:text="@string/dom_parser"/>
    </LinearLayout>
</android.support.constraint.ConstraintLayout>
```

Next create a `list_item.xml` file and add the following code:

**(b). list_item.xml**

Create a model layout for the ListView. In this case it will comprise of two `TextViews`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="TextView"
        android:textColor="#000"
        android:textAppearance="@style/Base.TextAppearance.AppCompat.Large"
        android:textStyle="bold"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="TextView"
        android:textColor="#000"
        android:textAppearance="@style/Base.TextAppearance.AppCompat.Body1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />
</android.support.constraint.ConstraintLayout>
```

### Step 4: Create Model class

Next create a file known as `Country.java` and add the following code:

```kotlin
public class Country {
    private String name,capital;

    public Country() {
    }

    public Country(String name, String capital) {

        this.name = name;
        this.capital = capital;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

}
```

That is our our model class.

### Step 5: Create a ListAdapter

To render the parsed countries in our `ListView` we need an `Adapter`. We will create one here. Go ahead and create a file known as `ListAdapter.java` and add the following code:

```kotlin
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class ListAdapter extends ArrayAdapter{
    private List<Country> country;
    private Context context;

    /**
     * Constructor
     *
     * @param context  The current context.
     * @param resource The resource ID for a layout file containing a TextView to use when
     *                 instantiating views.
     * @param objects  The objects to represent in the ListView.
     */
    public ListAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Country> objects) {
        super(context, resource, objects);
        this.country=objects;
        this.context=context;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater=(LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View listitem=inflater.inflate(R.layout.list_item,null,true);
        TextView countryName,countryCapital;
        countryName=listitem.findViewById(R.id.textView);
        countryCapital=listitem.findViewById(R.id.textView2);
        countryName.setText(country.get(position).getName());
        countryCapital.setText(country.get(position).getCapital());
        return listitem;
    }
}
```

### Step 6: Create a `DefaultHandler`

Next create a file known as `SAXXMLHandler.java` and add the following imports:

```kotlin
import android.util.Log;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.util.ArrayList;
```

Extend the `org.xml.sax.helpers.DefaultHandler` as follows:

```java
public class SAXXMLHandler extends DefaultHandler {
```

Create instance fields and a constructor, as well as method that logs out countries capital:

```java
    private ArrayList<Country> countries;
    private String tempvalue;
    Country country;
    public SAXXMLHandler() {
        countries=new ArrayList<>();
    }

    public ArrayList<Country> getCountries() {
        Log.d("count","countsax:"+countries.get(0).getCapital());
        Log.d("count","countsax:"+countries.get(1).getCapital());
        Log.d("count","countsax:"+countries.get(2).getCapital());
        return countries;
    }
```

Receive notification of the start of an element.

```java
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        tempvalue="";
        if(qName.equals("country")){
            country=new Country();
        }
    }
```

Receive notification of character data inside an element.

```java
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        tempvalue=new String(ch,start,length).trim();
        Log.d("count","string:"+tempvalue);
    }
```

Receive notification of the end of an element.

```java
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if(qName.equals("country")){
            countries.add(country);
            Log.d("count","countljla:"+country.getCapital());
            Log.d("count","countljla:"+country.getName());
        }else if(qName.equals("name")){
            country.setName(tempvalue);
            Log.d("count","countljla:"+country.getName());
        }else if(qName.equals("capital")){
            country.setCapital(tempvalue);
            Log.d("count","countljla:"+country.getCapital());

        }
    }
}
```

Here is the full code:

**SAXXMLHandler**

```kotlin
import android.util.Log;

import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.ArrayList;

public class SAXXMLHandler extends DefaultHandler {
    private ArrayList<Country> countries;
    private String tempvalue;
    Country country;
    public SAXXMLHandler() {
        countries=new ArrayList<>();
    }

    public ArrayList<Country> getCountries() {
        Log.d("count","countsax:"+countries.get(0).getCapital());
        Log.d("count","countsax:"+countries.get(1).getCapital());
        Log.d("count","countsax:"+countries.get(2).getCapital());
        return countries;
    }

    /**
     * Receive notification of the start of an element.
     * <p>
     * <p>By default, do nothing.  Application writers may override this
     * method in a subclass to take specific actions at the start of
     * each element (such as allocating a new tree node or writing
     * output to a file).</p>
     *
     * @param uri        The Namespace URI, or the empty string if the
     *                   element has no Namespace URI or if Namespace
     *                   processing is not being performed.
     * @param localName  The local name (without prefix), or the
     *                   empty string if Namespace processing is not being
     *                   performed.
     * @param qName      The qualified name (with prefix), or the
     *                   empty string if qualified names are not available.
     * @param attributes The attributes attached to the element.  If
     *                   there are no attributes, it shall be an empty
     *                   Attributes object.
     * @throws SAXException Any SAX exception, possibly
     *                      wrapping another exception.
     * @see ContentHandler#startElement
     */
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        tempvalue="";
        if(qName.equals("country")){
            country=new Country();
        }
    }

    /**
     * Receive notification of character data inside an element.
     * <p>
     * <p>By default, do nothing.  Application writers may override this
     * method to take specific actions for each chunk of character data
     * (such as adding the data to a node or buffer, or printing it to
     * a file).</p>
     *
     * @param ch     The characters.
     * @param start  The start position in the character array.
     * @param length The number of characters to use from the
     *               character array.
     * @throws SAXException Any SAX exception, possibly
     *                      wrapping another exception.
     * @see ContentHandler#characters
     */
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        tempvalue=new String(ch,start,length).trim();
        Log.d("count","string:"+tempvalue);
    }

    /**
     * Receive notification of the end of an element.
     * <p>
     * <p>By default, do nothing.  Application writers may override this
     * method in a subclass to take specific actions at the end of
     * each element (such as finalising a tree node or writing
     * output to a file).</p>
     *
     * @param uri       The Namespace URI, or the empty string if the
     *                  element has no Namespace URI or if Namespace
     *                  processing is not being performed.
     * @param localName The local name (without prefix), or the
     *                  empty string if Namespace processing is not being
     *                  performed.
     * @param qName     The qualified name (with prefix), or the
     *                  empty string if qualified names are not available.
     * @throws SAXException Any SAX exception, possibly
     *                      wrapping another exception.
     * @see ContentHandler#endElement
     */
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if(qName.equals("country")){
            countries.add(country);
            Log.d("count","countljla:"+country.getCapital());
            Log.d("count","countljla:"+country.getName());
        }else if(qName.equals("name")){
            country.setName(tempvalue);
            Log.d("count","countljla:"+country.getName());
        }else if(qName.equals("capital")){
            country.setCapital(tempvalue);
            Log.d("count","countljla:"+country.getCapital());

        }
    }
}
```

### Step 7: Create `MainActivity`

Next create a file known as `MainActivity.java` and add the following code:

Here is how we will parse the XML using the `XmlPullParser`:

```kotlin
        mBtnPull.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
```

Create a `try` block and declare the `XmlPullParserFactory` and `XmlPullParser` as follows:

```java
                try {
                    XmlPullParserFactory xmlPullParserFactory;
                    XmlPullParser xmlPullParser=null;
```

Then instantiate the `XmlPullParserFactory` using the `newInstance()` method, and the `XmlPullParser` using the `newPullParser()` method:

```java
                    try {
                        xmlPullParserFactory = XmlPullParserFactory.newInstance();
                        xmlPullParser = xmlPullParserFactory.newPullParser();
```

Then load XML data from the `assets` folder and parse it:

```java
                        ios = getApplication().getAssets().open("coutries.xml");
                        Log.d("sdlc","ios"+ios.read());
                        xmlPullParser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
                        xmlPullParser.setInput(ios, null);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    countries=parseXML(xmlPullParser);
```

Then render the parsed data to the ListView:

```java
                    adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
                    mListView.setAdapter(adapter);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (XmlPullParserException e) {
                    e.printStackTrace();
                }
            }
        });
```

Also parse the XML using the `XMLDomParser` and `XMLPullParser`:

```java
        mBtnDom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               countries=parseXXMLDom();
                Log.d("count","count:"+countries.size());
                Log.d("count","count:"+countries.get(0).getCapital());
                Log.d("count","count:"+countries.get(1).getCapital());
                Log.d("count","count:"+countries.get(2).getCapital());
               adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
               mListView.setAdapter(adapter);

            }
        });
        mBtnSax.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                countries=parseXMLSAX();
                Log.d("count","count:"+countries.size());
                Log.d("count","count:"+countries.get(0).getCapital());
                Log.d("count","count:"+countries.get(1).getCapital());
                Log.d("count","count:"+countries.get(2).getCapital());

                adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
                mListView.setAdapter(adapter);

            }
        });

    }
```

Here is a method that parses XML using the `XmlPullParser` class:

```java
    ArrayList<Country> parseXML(XmlPullParser parser) throws IOException, XmlPullParserException {
        ArrayList<Country> countries = null;
        int evenId = parser.getEventType();
        Country country = null;

        while (evenId != XmlPullParser.END_DOCUMENT) {
            String name;
            switch (evenId) {
                case XmlPullParser.START_DOCUMENT:
                    countries = new ArrayList<>();
                    break;
                case XmlPullParser.START_TAG:
                    name = parser.getName();
                    if (name.equals("country")) {
                        country = new Country();
                    } else if (country != null) {
                        if (name.equals("name"))
                            country.setName(parser.nextText());
                        else if (name.equals("capital"))
                            country.setCapital(parser.nextText());
                    }
                    break;
                case XmlPullParser.END_TAG:
                    name = parser.getName();
                    if (name.equalsIgnoreCase("country") && country != null) {
                        countries.add(country);
                    }
                    break;

            }
            evenId=parser.next();

        }
        return countries;
    }
```

Here is a method that parses XML using the `SAXParser`:

```java
    /**
     * parsing XML using SAX method
     * @return Arraylist of Countries
     */
    public ArrayList<Country> parseXMLSAX(){
        ArrayList<Country> countriesTemp=null;
        try{
            SAXParserFactory saxParserFactory=SAXParserFactory.newInstance();
            SAXParser saxParser=saxParserFactory.newSAXParser();
            XMLReader xmlReader=saxParser.getXMLReader();
            SAXXMLHandler saxxmlHandler=new SAXXMLHandler();
            xmlReader.setContentHandler(saxxmlHandler);
            ios = getApplication().getAssets().open("country.xml");
           xmlReader.parse(new InputSource(ios));
           countriesTemp=saxxmlHandler.getCountries();
            Log.d("count","count:"+countriesTemp.get(0).getCapital());
            Log.d("count","count:"+countriesTemp.get(1).getCapital());
            Log.d("count","count:"+countriesTemp.get(2).getCapital());
        }catch (Exception e){
            e.printStackTrace();
        }
        return countriesTemp;
    }
```

Here is a method parses XML using the `DocumentBuilder` or DomParser:

```java
    /**
     * parsing XML document using DOM method
     * @return Arraylist of Countries
     */
    ArrayList<Country> parseXXMLDom(){
        DocumentBuilderFactory documentBuilderFactory=DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder;
        Document document;
        ArrayList<Country> countriesTemp=new ArrayList<>();
        Country country=null;
        try {
            documentBuilder=documentBuilderFactory.newDocumentBuilder();
            ios=getAssets().open("country.xml");
            document=documentBuilder.parse(ios);
            Element element=document.getDocumentElement();
            element.normalize();
            NodeList nodeList=document.getElementsByTagName("country");
            for(int i=0;i<nodeList.getLength();i++){
                Node node=nodeList.item(i);
                if(node.getNodeType()==Node.ELEMENT_NODE){
                    Element element1=(Element) node;
                    country=new Country();
                    country.setName(getValuefromXML("name",element1));
                    country.setCapital(getValuefromXML("capital",element1));
                    countriesTemp.add(country);
                }

            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        for(int i=0;i<countriesTemp.size();i++){
            Log.d("actvalue",""+countriesTemp.get(i).getName());
            Log.d("actvalue",""+countriesTemp.get(i).getCapital());

        }
        return countriesTemp;
    }
```

This method will allow us obtain a Node from an XML element:

```java
    /**
     * get value from DOM tree
     * @param tag=tag name
     * @param element=element
     * @return string
     */
    private static String getValuefromXML(String tag,Element element){
        NodeList nodeList=element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node=(Node)nodeList.item(0);
        Log.d("nodevalue",node.getNodeValue());
        return node.getNodeValue();
    }

}
```

Here is the full code:

**MainActivity.java**

```kotlin
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

/**
 * Uses: ListView,PullParser,SAXParser,DOMParser
 */
public class MainActivity extends AppCompatActivity {
    private ListView mListView;
    private Button mBtnDom,mBtnSax,mBtnPull;
    ArrayList<Country> countries;
    InputStream ios;
    ListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mListView = findViewById(R.id.listview);
        mBtnSax=findViewById(R.id.saxparser);
        mBtnDom=findViewById(R.id.domparser);
        mBtnPull=findViewById(R.id.pull);
        adapter = new ListAdapter(getApplicationContext(), R.layout.list_item, countries);
        btnClicks();

    }

    /**
     * handling Button clicks
     */
    void btnClicks(){
        mBtnPull.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    XmlPullParserFactory xmlPullParserFactory;
                    XmlPullParser xmlPullParser=null;
                    try {
                        xmlPullParserFactory = XmlPullParserFactory.newInstance();
                        xmlPullParser = xmlPullParserFactory.newPullParser();
                        ios = getApplication().getAssets().open("coutries.xml");
                        Log.d("sdlc","ios"+ios.read());
                        xmlPullParser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
                        xmlPullParser.setInput(ios, null);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    countries=parseXML(xmlPullParser);

                    adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
                    mListView.setAdapter(adapter);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (XmlPullParserException e) {
                    e.printStackTrace();
                }
            }
        });
        mBtnDom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               countries=parseXXMLDom();
                Log.d("count","count:"+countries.size());
                Log.d("count","count:"+countries.get(0).getCapital());
                Log.d("count","count:"+countries.get(1).getCapital());
                Log.d("count","count:"+countries.get(2).getCapital());
               adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
               mListView.setAdapter(adapter);

            }
        });
        mBtnSax.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                countries=parseXMLSAX();
                Log.d("count","count:"+countries.size());
                Log.d("count","count:"+countries.get(0).getCapital());
                Log.d("count","count:"+countries.get(1).getCapital());
                Log.d("count","count:"+countries.get(2).getCapital());

                adapter=new ListAdapter(getApplicationContext(),R.layout.list_item,countries);
                mListView.setAdapter(adapter);

            }
        });

    }

    /**
     * parsing using PullParser
     * @param parser=XmlPullParser
     * @return Arraylist of Countries
     * @throws IOException
     * @throws XmlPullParserException
     */
    ArrayList<Country> parseXML(XmlPullParser parser) throws IOException, XmlPullParserException {
        ArrayList<Country> countries = null;
        int evenId = parser.getEventType();
        Country country = null;

        while (evenId != XmlPullParser.END_DOCUMENT) {
            String name;
            switch (evenId) {
                case XmlPullParser.START_DOCUMENT:
                    countries = new ArrayList<>();
                    break;
                case XmlPullParser.START_TAG:
                    name = parser.getName();
                    if (name.equals("country")) {
                        country = new Country();
                    } else if (country != null) {
                        if (name.equals("name"))
                            country.setName(parser.nextText());
                        else if (name.equals("capital"))
                            country.setCapital(parser.nextText());
                    }
                    break;
                case XmlPullParser.END_TAG:
                    name = parser.getName();
                    if (name.equalsIgnoreCase("country") && country != null) {
                        countries.add(country);
                    }
                    break;

            }
            evenId=parser.next();

        }
        return countries;
    }

    /**
     * parsing XML using SAX method
     * @return Arraylist of Countries
     */
    public ArrayList<Country> parseXMLSAX(){
        ArrayList<Country> countriesTemp=null;
        try{
            SAXParserFactory saxParserFactory=SAXParserFactory.newInstance();
            SAXParser saxParser=saxParserFactory.newSAXParser();
            XMLReader xmlReader=saxParser.getXMLReader();
            SAXXMLHandler saxxmlHandler=new SAXXMLHandler();
            xmlReader.setContentHandler(saxxmlHandler);
            ios = getApplication().getAssets().open("country.xml");
           xmlReader.parse(new InputSource(ios));
           countriesTemp=saxxmlHandler.getCountries();
            Log.d("count","count:"+countriesTemp.get(0).getCapital());
            Log.d("count","count:"+countriesTemp.get(1).getCapital());
            Log.d("count","count:"+countriesTemp.get(2).getCapital());
        }catch (Exception e){
            e.printStackTrace();
        }
        return countriesTemp;
    }

    /**
     * parsing XML document using DOM method
     * @return Arraylist of Countries
     */
    ArrayList<Country> parseXXMLDom(){
        DocumentBuilderFactory documentBuilderFactory=DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder;
        Document document;
        ArrayList<Country> countriesTemp=new ArrayList<>();
        Country country=null;
        try {
            documentBuilder=documentBuilderFactory.newDocumentBuilder();
            ios=getAssets().open("country.xml");
            document=documentBuilder.parse(ios);
            Element element=document.getDocumentElement();
            element.normalize();
            NodeList nodeList=document.getElementsByTagName("country");
            for(int i=0;i<nodeList.getLength();i++){
                Node node=nodeList.item(i);
                if(node.getNodeType()==Node.ELEMENT_NODE){
                    Element element1=(Element) node;
                    country=new Country();
                    country.setName(getValuefromXML("name",element1));
                    country.setCapital(getValuefromXML("capital",element1));
                    countriesTemp.add(country);
                }

            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        for(int i=0;i<countriesTemp.size();i++){
            Log.d("actvalue",""+countriesTemp.get(i).getName());
            Log.d("actvalue",""+countriesTemp.get(i).getCapital());

        }
        return countriesTemp;
    }

    /**
     * get value from DOM tree
     * @param tag=tag name
     * @param element=element
     * @return string
     */
    private static String getValuefromXML(String tag,Element element){
        NodeList nodeList=element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node=(Node)nodeList.item(0);
        Log.d("nodevalue",node.getNodeValue());
        return node.getNodeValue();
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/urvishjarvis1/androidbasics/tree/master/XMLParsing) Example |
| 2. | [Follow](https://github.com/urvishjarvis1/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
