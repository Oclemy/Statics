# Android PHP MySQL PDF Reader Examples

In this tutorial we will look at how to work with online PDF Documents. That is we to render or view PDF Documents hosted in the server in mysql database.


## Example 1: Android PHP MySQL PDFViewer – GridView – Select and Render PDF Documents

In this tutorial we will see how to select PDF documents from mysql database, list them with images and text also from mysql database and render the PDF Document in a new activity for reading.

We will store PDF documents, PDF images, PDF name, description and author in mysql database. Then these will be downloaded and shown in a custom GridView with images and text. When the user clicks a single PDF document, we will render it internally with the android pdf viewer library.

As we download PDFs from our mysql we will be showing a progressbar. The PDF documents get downloaded from php mysql server in a background thread so our app will remain responsive throughout.

## **We are Building a Vibrant YouTube Community**

We have a fast rising YouTube Channel of friends. So far we've accumulated more than 2.6 million agreggate views and more than 10,000 subscribers. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

Here's this tutorial in Video Format.

## **What is a PDF ?**

PDF stands for Portable Document Format and is basically a file format for rendering documents including text formatting and images.

That file format can then read independent of application software, hardware and even operating systems. It's portable.

PDF was introduced in the 1990s and is normally based on the PostScript language, a creation of Adobe Systems.

The PDF combines three technologies:

1. A subset of the PostScript page description programming language, for generating the layout and graphics.
2. A font-embedding/replacement system to allow fonts to travel with the documents.
3. A structured storage system to bundle these elements and any associated content into a single file, with data compression where appropriate.

## **What is GridView?**

A view that shows items in two-dimensional scrolling grid. The items in the grid come from the ListAdapter associated with this view.

Here's an example of a simple description of gridview in layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<GridView
    android_id="@+id/gridview"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_columnWidth="90dp"
    android_numColumns="auto_fit"
    android_verticalSpacing="10dp"
    android_horizontalSpacing="10dp"
    android_stretchMode="columnWidth"
    android_gravity="center"
/>
```

#### What is a Database?

A database, generally speaking, refers to any organized collection of data

There are several types of databases:

1. Flat file databases ― these store data sequentially, often in plain text files.
2. Hierarchical databases ― these organize data in parent/child relationships.
3. Key-value/document-oriented databases ― these store free-form data indexed by a key or hash value.
4. Relational databases ― these organize data in rows and tables. This is the most popular and is what we use in our case to store PDF documents.

#### What is MySQL ?

MySQL is an open source, multithreaded, relational database management system created by Michael “Monty” Widenius in 1995.

Many businesses these days develop and maintain custom software with MySQL. Additionally, majority of the most popular websites(e.g Wikipedia) and software use MySQL for their database.

One of the most prominent features of MySQL is its speed and scalability. Together with MariaDB, MySQL's identical twin brother/sister, tends of thousands of rows and billions of rows of data can efficiently be handled.

However, you can also use MySQL for small amounts of data, like we will do to store our PDF documents in this android pdf viewer app we will create.

## **MySQLi**

PHP has `mysqli` extension which allows us to access the functionality provided by MySQL 4.1 and above.

As an extension, `mysqli` exposes APIs to the PHP programmer, to allow us work with MySQL database programmatically.

Normally there are three ways(APIs) of working with MySQL from database:

1. PHP MySQLi extension.
2. PHP MySQL extension.
3. PHP Data Objects(PDO).

In this class we will use the most commonly used API which is `mysqli`.

## **Advantages of MySQLi**

MySQLi is the most popular API for working with MySQL database because of the following reasons:

1. Provision of both Object Oriented and Procedural Interfaces.
2. Embedded Server support.
3. Support for Prepared Statements.
4. Ability to use Multiple Statements.
5. Transactions support.

etc

You can find more information about mysqli [here](http://php.net/manual/en/mysqli.overview.php).

## **Preparing our PDFs and PDF Icons**

Obviously you must place somewhere the PDFs that we will be downloading to device, as well as their icons. You have to be aware that normally, even though you can also do it, binary files get stored in the filesystem as opposed to directly into the database.

This then provides more efficiency, ease of use, flexibility and portability. For instance when thousands of people are accessing our database, our queries will be much much faster when we are retrieving simple PDF paths/urls as opposed to large blobs.

Moreover, we don't have to transport those blobs via low level streams, instead we can just transfer the URLs and leave the downloading to much better written tools like Picasso or Glide to do the downloading for us. Morever these imageloaders can also cache, resize or handle failures much better.

So we will create a folder to hold our PDF documents and another folder to hold our images, then store the paths to these files in our database.

Something like this:

.

Then under the `pdf_icons` folder we will have the images as follows:

.

and under the `pdfs` folder we will have the PDF documents as follows:

.

## **Create MySQL Table**

You need to create MySQL database then table. We will use that table to save details about our PDF document. These details will later be fetched by PHP and json encoded.

Then when our android app makes a HTTP GET request, it will end up with JSON data containing list of our PDF documents and their details.

I recommend you use tools like PHPMyAdmin and Adminer if you are a beginner to create your database table. You can get these by installing the any of the following:

1. WAMP/MAMP Server.
2. XAMPP Server.
3. Uniform Server( I used this. It supports PHP 7 and is lightwight and portable yet full featured. It's a lightweight WAMP server).

I used the following SQL statement to create my MySQL table:

```sql
CREATE TABLE `pdfdb`.`pdfTB` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `category` VARCHAR(100) NOT NULL , `description` TEXT NOT NULL , `pdf_url` VARCHAR(200) NOT NULL , `pdf_icon_url` VARCHAR(200) NOT NULL , `author` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

As you can see we have the following details. Note that SQL is generally case insensitive:

1. Database Name : `pdfDB`.
2. Database Table : `pdfTB`.
3. Row ID : `id` :: `int` :: `autoincrement` :: `primary Key`.
4. Name : `varchar(100)` - To hold pdf name/title. This title will be rendered in our custom gridview.
5. Category : `varchar(100)` - To hold PDF Category.
6. Description : `text` - To hold PDF description.
7. PDF URL : `varchar(200)` - To hold PDF URL. in fact path(e.g `/pdfs/java-tutorial.pdf`. This is important because this will be appended to our base URL then downloaded. It's normally efficient and more common to store files as files in the server then store their URLs in the database instead of storing the binary blobs directly in the database.
8. PDF ICON URL - `varchar(200)` - To make our app user friendly, we will have PDF icons/images which will be shown in our custom gridview. This is better than just showing PDF names alone. However, just like the PDF documents themselves, it's more efficient and better to store images as files in the file system, then their urls in the database. Then these images will be loaded using Picasso from our android app into an a imageview.
9. PDF Author - `varchar(100)` - To store the PDF Author. The author will also be shown in our gridview.

Here's MySQL Table structure:

.

## **Insert PDFs to MySQL**

Well we now need to insert our pdf details into mysql database. For this app, we'll assume that this is done at the server level, maybe via some web interface. We are not uploading PDF documents from the device to the PHP server then downloading them again.

Instead our PDFs already exist in php mysql server, so we just download and display them.

If you created your database table using the `Create Table` script I supplied, then you can use this to insert.

```sql
INSERT INTO `pdfTB` (`id`, `name`, `category`, `description`, `pdf_url`, `pdf_icon_url`, `author`) VALUES (NULL, 'Comparison Of Programming Languages', 'Programming Languages', 'An empirical comparison ofrnC, C++, Java, Perl, Python, Rexx, and Tcl', '/pdfs/comparison-of-programming-languages.pdf', '/pdf-icons/comparison-of-programming-languages.PNG', 'Lutz Prechelt'), (NULL, 'Fundamental Concepts in Programming Languages', 'Programming Languages', 'This paper forms the substance of a course of lectures given at the International Summer School inrnComputer Programming at Copenhagen in August, 1967.', '/pdfs/comparison-of-programming-languages.pdf', '/pdf-icons/concepts-in-programming-languages.PNG', 'CHRISTOPHER STRACHEY')
```

Or just use PHPMyAdmin to insert data to mysql, it's easy just try it. You use an interface like this:

.

## **What is PHP?**

PHP is a server-side programming language used for creating dynamic websites and interactive web applications.

The acronym PHP originally stood for `Personal Home Page`, but as its functionality grew this was changed to `PHP: Hypertext Preprocessor`.

### **PHP Hello World**

PHP code can be embedded anywhere in a web document in many different ways. However, the standard notation is to delimit the code by `<?php` and `?>`.

```php
<?php ... ?>
```

The last closing tag in a script file may be omitted if the file ends in PHP mode.

```php
<?php ... ?>
<?php ...
```

Then we can write our Hello World in a single line of code:

```php
<?php
echo "Hello World";
print "Hello World"
?>
```

So a full PHP Hello World with HTML can be something like this:

```html
<html>
<head><title>PHP Hello World</title></head>
<body>
<?php echo "Hello World Camposha"; ?>
</body>
</html>
```

## **Variables in PHP**

Normally, variables get used for data storage. These data may be of different types like numbers or strings.

They are stored so that they can be used multiple times in a script.

Here's how we declare a variable in PHP:

```php
$myName;
```

In PHP, be aware, that variables are case sensitive.

Then we can assign a value to a variable by using the equals sign, or assignment operator `(=)`. Then we say our variable is `initialized`.

```php
$myName = "Oclemy";
```

Then later on we can use that variable by referencing it just using the variable's name.

```php
echo $myName;
```

You can find more documentation about PHP in it's official website [here](http://php.net/).

Let's now start some code. We explain then provide the complete code after the explanation.

## **PHP MySQL Code**

As usual we will work in an object oriented manner. We use only one file, called `index.php` and two classes:

1. `Constants` - To hold database constants.
2. `Pdfs`\- To perform our query and json encode our data.

## **Explanations**

### **1\. Create Database Constants**

We create a class to hold our database credentials. These include the server name, the database name, the username and password.

```php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="pdfDB";
    static $USERNAME="sisi";
    static $PASSWORD="pass";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM pdfTB";

}
```

## **2\. Create `Pdfs` Class**

This class will be responsible for querying our data and encoding it into json format. It will also handle exceptions appropriately.

```pho
class Pdfs
{
    ....
}
```

## **3\. Connect to MySQL Database**

First we need to connect to MySQL database. So we create a class that instantiates the `mysqli` class, passing in the database credentials and returning either the `mysqli` connection instance or `null`.

```php
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
            return null;
        }else
        {
            return $con;
        }
    }
```

## **4\. Select PDF Documents From MySQL**

Next we create a function that will use the established `mysqli` connection to connect and perform a select query of all PDF documents in our database and return them.

Then using the `json_encode()` function we encode an array we have fetched into JSON format so that we can send it via HTTP protocol.

The client will be making a HTTP GET request and we will return data in JSON format.

Even if we have an exception, we still JSON encode a message and return so that our app users can see a helpful message at runtime displayed in a Toast message.

```php
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows>0)
            {
                $pdfs=array();
                while($row=$result->fetch_array())
                {
                    array_push($pdfs, array("id"=>$row['id'],"name"=>$row['name'],"category"=>$row['category'],"description"=>$row['description'],"pdf_url"=>$row['pdf_url'],"pdf_icon_url"=>$row['pdf_icon_url'],"author"=>$row['author']));
                }
                print(json_encode(array_reverse($pdfs)));
            }else
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
```

## **5\. Start Listening for HTTP GET Requests**

Well we do this by instantiating our `Pdfs` class and invoking the `select` method.

We do this outside our class:

```php
$pdfs=new Pdfs();
$pdfs->select();
```

Here's the full source code for our PHP side. Just copy paste it into one file most commonly called `index.php`

## index.php

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="pdfDB";
    static $USERNAME="sisi";
    static $PASSWORD="pass";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM pdfTB";

}

class Pdfs
{

    /*******************************************************************************************************************************************/
    /*
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
            return null;
        }else
        {
            return $con;
        }
    }
    /*******************************************************************************************************************************************/
    /*
       1.SELECT FROM DATABASE.
    */
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows>0)
            {
                $pdfs=array();
                while($row=$result->fetch_array())
                {
                    array_push($pdfs, array("id"=>$row['id'],"name"=>$row['name'],"category"=>$row['category'],"description"=>$row['description'],"pdf_url"=>$row['pdf_url'],"pdf_icon_url"=>$row['pdf_icon_url'],"author"=>$row['author']));
                }
                print(json_encode(array_reverse($pdfs)));
            }else
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
}
$pdfs=new Pdfs();
$pdfs->select();
```

Let's now move over to android studio. We use java as our programming language.

## **Android Studio Project Structure and Setp**

Here's our project structure:

.

## **Build.gradle(App level)**

Inside you android studio project's app directory, there is a file named `build.gradle`.

There is a dependency's closure, go there and add dependencies as below.

Beware that versions do change and you are allowed to use later versions, especially with the support libraries.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support:cardview-v7:26.+'
    implementation 'com.android.support:design:26.+'
    implementation 'com.amitshekhar.android:android-networking:1.0.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.barteksc:android-pdf-viewer:2.8.2'
    implementation 'com.github.kk121:File-Loader:1.2'
}
```

Clearly you can see are working with 4 third party libraries:

1. Fast Android Networking - To make our HTTP GET requests in the background thread. Basically download our PDF detaisl from the server.
2. Picasso - To download images, that is PDF Icons from the server.
3. File Loader - To download the actual PDF files from the server and save them temporarily in the internal storage.
4. Android PDF Viewer - To view the downloaded PDF documents.

## **Build.gradle(Project Level)**

Before clicking sycn, we need to add this `maven { url 'https://jitpack.io' }` to your project level build.gradle.This file is located in the project's folder of your application.

So the `allProjects` object should look like this:

```groovy

allprojects {
    repositories {
        google()
        jcenter()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

## **AndroidManifest.xml**

Not only do android components like(activities, fragments, services etc) get registered here, but also we add the permissions we require here.

We are adding three permissions. Our application will make a HTTP GET request so we need to add internet permission.

Our PDF file can also be written or read from external storage so we will add the approprate permissions.

```groovy
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.mysqlpdfs">

    <uses-permission android_name="android.permission.INTERNET"/>
    <uses-permission android_name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android_name=".PDFActivity"></activity>
    </application>

</manifest>
```

We now move over to user interface code.

## **XML Layout Code**

These you just copy paste and they are self-explanatory.

## **1\. activity_main.xml**

We use a LinearLayout with vertical orientation as our root tag. This layout will get infkated into our main activity.

At the top we will have a TextView to render our application header. The font color will be material accent color.

Below it we will have a progressbar. This will be rendered as we download our data from PHP mysql server. It only gets displayed as we download. On completion it gets dismissied automatically.

Then we will have a gridview to render the downloaded data from mysql.

Lastly a button to initiate the download of data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.mysqlpdfs.MainActivity">
    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="PDF Viewer App"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ProgressBar
        android_id="@+id/myProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <GridView
        android_id="@+id/myGridView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
    <Button
        android_id="@+id/downloadBtn"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="@color/colorAccent"
        android_text="Download" />
</LinearLayout>
```

## **2\. row_model.xml**

This layout models the view for a single grid in our gridview. It will be inflated in our adapter into a View object.

At the root we have a CardView. Each CardView will be displaying PDF details from MySQL database.

Basically texts and images which will be downloaded from php mysql server.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="10dp"
    android_layout_height="300dp">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_id="@+id/imageView"
            android_layout_width="match_parent"
            android_layout_height="150dp"
            android_padding="10dp"
            android_src="@drawable/placeholder"/>
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text="PDF Document"
                android_id="@+id/pdfNameTxt"
                android_padding="5dp"
                android_layout_below="@+id/imageView"
                android_layout_alignParentLeft="true"/>
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text=" Author --------------------"
                android_id="@+id/authorTxt"
                android_textColor="@color/colorAccent"
                android_padding="5dp"
                android_layout_below="@+id/pdfNameTxt"
                android_layout_alignParentLeft="true"/>

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

## **3\. activity_pdf.xml**

To render our PDF document for reading/viewing, we need a separate activity. That activity needs a layout. This layout.

This layout will be inflated into our PDF Activity. So it needs a `PDFView` element to render that PDF with a scrollbar.

Also maybe a progressbar to be displayed while attempting to render large PDF documents.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mysqlpdfs.PDFActivity">

    <ProgressBar
        android_id="@+id/pdfViewProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <com.github.barteksc.pdfviewer.PDFView
        android_id="@+id/pdfView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>

</RelativeLayout>
```

It's now time to come to our Java code

## **Java Code**

For simplicity sake we have condensed everything in just two files. This makes it easy to reuse this code by just copy pasting them in your activities and modfying appropriately.

## **1\. PDFActivity.java**

It's main responsibility is to receive a PDF URL, download that PDF and render it on the PDFView.

## **Explanations**

### **(a). Add Appropriate Imports**

Below you package we will be having several import statements

```java
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener;
import com.github.barteksc.pdfviewer.listener.OnPageErrorListener;
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle;
import com.krishna.fileloader.FileLoader;
import com.krishna.fileloader.listener.FileRequestListener;
import com.krishna.fileloader.pojo.FileResponse;
import com.krishna.fileloader.request.FileLoadRequest;

import java.io.File;
```

## **(b). Create an Activity**

You do this just by creating a class and having it derive from `android.app.Activity` or `android.support.v7.app.AppCompatActivity` like in this case. Then you make sure it's registered in the androidmanifest. AndroidStudio will do these for you if you use a wizard.

```java
public class PDFActivity extends AppCompatActivity ..{...}
```

## **(b). Implement OnLoadCompleteListener and OnPageErrorListener**

```java
public class PDFActivity extends AppCompatActivity implements OnLoadCompleteListener, OnPageErrorListener {
    .....
 @Override
    public void loadComplete(int nbPages) {
        pdfViewProgressBar.setVisibility(View.GONE);
        Toast.makeText(PDFActivity.this, String.valueOf(nbPages), Toast.LENGTH_LONG).show();
    }
    @Override
    public void onPageError(int page, Throwable t) {
        pdfViewProgressBar.setVisibility(View.GONE);
        Toast.makeText(PDFActivity.this, t.getMessage(), Toast.LENGTH_LONG).show();
    }
}
```

These are two interfaces we get from our `PDFViewer` library. The first one denotes successful completion of loading our PDF Document into the PDFView while the second one denotes a failure.

## **(b). Render PDF Document**

First we receive it's URL from the main activity then download it.

```java
        Intent i=this.getIntent();
        final String path=i.getExtras().getString("PATH");
```

To download the PDF we use `FileLoader` class:

```java
            FileLoader.with(this)
                .load(path,false) //2nd parameter is optioal, pass true to force load from network
                .fromDirectory("My_PDFs", FileLoader.DIR_INTERNAL)
```

We are downloading it into internal storage in this case.

Once the download is complete we render the PDF in our PDFView so that the user can read it:

```java
                    File pdfFile = response.getBody();
                        try {
                            pdfView.fromFile(pdfFile)
                                    .defaultPage(1)
                                    .enableAnnotationRendering(true)
                                    .onLoad(PDFActivity.this)
                                    .scrollHandle(new DefaultScrollHandle(PDFActivity.this))
                                    .spacing(10) // in dp
                                    .onPageError(PDFActivity.this)
                                    .load();
```

Here's the full `onCreate()` method:

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pdf);

        final PDFView pdfView= findViewById(R.id.pdfView);
        pdfViewProgressBar=findViewById(R.id.pdfViewProgressBar);

        pdfViewProgressBar.setVisibility(View.VISIBLE);

        //UNPACK OUR DATA FROM INTENT
        Intent i=this.getIntent();
        final String path=i.getExtras().getString("PATH");

        FileLoader.with(this)
                .load(path,false) //2nd parameter is optioal, pass true to force load from network
                .fromDirectory("My_PDFs", FileLoader.DIR_INTERNAL)
                .asFile(new FileRequestListener<File>() {
                    @Override
                    public void onLoad(FileLoadRequest request, FileResponse<File> response) {
                        pdfViewProgressBar.setVisibility(View.GONE);
                        File pdfFile = response.getBody();
                        try {
                            pdfView.fromFile(pdfFile)
                                    .defaultPage(1)
                                    .enableAnnotationRendering(true)
                                    .onLoad(PDFActivity.this)
                                    .scrollHandle(new DefaultScrollHandle(PDFActivity.this))
                                    .spacing(10) // in dp
                                    .onPageError(PDFActivity.this)
                                    .load();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    @Override
                    public void onError(FileLoadRequest request, Throwable t) {
                        pdfViewProgressBar.setVisibility(View.GONE);
                        Toast.makeText(PDFActivity.this, t.getMessage(), Toast.LENGTH_LONG).show();
                    }
                });
    }
```

Here's the full PDFActivity code>

## PDFActivity.java

```java
package info.camposha.mysqlpdfs;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener;
import com.github.barteksc.pdfviewer.listener.OnPageErrorListener;
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle;
import com.krishna.fileloader.FileLoader;
import com.krishna.fileloader.listener.FileRequestListener;
import com.krishna.fileloader.pojo.FileResponse;
import com.krishna.fileloader.request.FileLoadRequest;

import java.io.File;

public class PDFActivity extends AppCompatActivity implements OnLoadCompleteListener, OnPageErrorListener {

    ProgressBar pdfViewProgressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pdf);

        final PDFView pdfView= findViewById(R.id.pdfView);
        pdfViewProgressBar=findViewById(R.id.pdfViewProgressBar);

        pdfViewProgressBar.setVisibility(View.VISIBLE);

        //UNPACK OUR DATA FROM INTENT
        Intent i=this.getIntent();
        final String path=i.getExtras().getString("PATH");

        FileLoader.with(this)
                .load(path,false) //2nd parameter is optioal, pass true to force load from network
                .fromDirectory("My_PDFs", FileLoader.DIR_INTERNAL)
                .asFile(new FileRequestListener<File>() {
                    @Override
                    public void onLoad(FileLoadRequest request, FileResponse<File> response) {
                        pdfViewProgressBar.setVisibility(View.GONE);
                        File pdfFile = response.getBody();
                        try {
                            pdfView.fromFile(pdfFile)
                                    .defaultPage(1)
                                    .enableAnnotationRendering(true)
                                    .onLoad(PDFActivity.this)
                                    .scrollHandle(new DefaultScrollHandle(PDFActivity.this))
                                    .spacing(10) // in dp
                                    .onPageError(PDFActivity.this)
                                    .load();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    @Override
                    public void onError(FileLoadRequest request, Throwable t) {
                        pdfViewProgressBar.setVisibility(View.GONE);
                        Toast.makeText(PDFActivity.this, t.getMessage(), Toast.LENGTH_LONG).show();
                    }
                });
    }
    @Override
    public void loadComplete(int nbPages) {
        pdfViewProgressBar.setVisibility(View.GONE);
        Toast.makeText(PDFActivity.this, String.valueOf(nbPages), Toast.LENGTH_LONG).show();
    }
    @Override
    public void onPageError(int page, Throwable t) {
        pdfViewProgressBar.setVisibility(View.GONE);
        Toast.makeText(PDFActivity.this, t.getMessage(), Toast.LENGTH_LONG).show();
    }
}
```

## **2\. MainActivity.java**

This is our main activity. It is mainly responsible for downloading data from our php mysql server and bind it to our gridview.

## Explanations

## **1\. Create the Activity**

It has probably been created for you by android studio.

```java
public class MainActivity extends AppCompatActivity {..}
```

## **2\. Define PDF Document**

We do this using a POJO(Plain Old Java Object). We define the properties of our PDF like id, name, category, pdfURL and pdfIconURL.

```java
    public class PDFDoc {
        int id;
        String name,category,pdfURL,pdfIconURL;
        public int getId() {return id;}
        public void setId(int id) {this.id = id;}
        public String getName() {return name;}
        public void setName(String name) {this.name = name;}
        public String getAuthor() {return category;}
        public void setCategory(String category) {this.category = category;}
        public String getPdfURL() {return pdfURL;}
        public void setPdfURL(String pdfURL) {this.pdfURL = pdfURL;}
        public String getPdfIconURL() {return pdfIconURL;}
        public void setPdfIconURL(String pdfIconURL) {this.pdfIconURL = pdfIconURL;}
    }
```

## **3\. Create Adapter**

We do this by creating a class and extending it with `android.widget.BaseAdapter`:

```java
    public class GridViewAdapter extends BaseAdapter {..}
```

The we define instance fields: Context and ArrayList of PDF Documents:

```java
        Context c;
        ArrayList<PDFDoc> pdfDocuments;
```

Then assign them objects we receive via Constructor:

```java
        public GridViewAdapter(Context c, ArrayList<PDFDoc> pdfDocuments) {
            this.c = c;
            this.pdfDocuments = pdfDocuments;
        }
```

Then override the `getCount()`,`getItem()`, `getItemId()` and `getView()`

```java
        @Override
        public int getCount() {return pdfDocuments.size();}
        @Override
        public Object getItem(int pos) {return pdfDocuments.get(pos);}
        @Override
        public long getItemId(int pos) {return pos;}
        @Override
        public View getView(int pos, View view, ViewGroup ){..}
```

We will inflate our `row_model` into a view object if it is null:

```java
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }
```

We then reference widgets from the inflated view:

```java

            TextView txtName = view.findViewById(R.id.pdfNameTxt);
            TextView txtAuthor = view.findViewById(R.id.authorTxt);
            ImageView pdfIcon = view.findViewById(R.id.imageView);
```

Then obtain a PDF document and retrieve its name and author property and set it to our TextViews:

```java
            final PDFDoc pdf= (PDFDoc) this.getItem(pos);

            txtName.setText(pdf.getName());
            txtAuthor.setText(pdf.getAuthor());
```

As for the images, we are using Picasso ImageLoader. We will check if there is a pdf url then load it. Meanwhile we show a placeholder image.

If we don't have the appropriate URL then we use a default Icon.

```java
            if(pdf.getPdfURL() != null && pdf.getPdfURL().length()>0)
            {
                Picasso.get().load(pdf.getPdfIconURL()).placeholder(R.drawable.placeholder).into(pdfIcon);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.pdf_icon).into(pdfIcon);
            }
```

We will then listen to onClick events and open a new activity, passing in in the PDF path. We use intent to pass the path to the second activity:

```java
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, pdf.getName(), Toast.LENGTH_SHORT).show();
                    Intent i=new Intent(c,PDFActivity.class);
                    i.putExtra("PATH",pdf.getPdfURL());
                    c.startActivity(i);
                }
            });
```

## **4\. Create our HTTP Client**

This class will be responsible for downloading JSON data and parsing it and passing it to our custom adapter to be bound to our custom gridview.

```java
    public class JSONDownloader {..}
```

We define the target URL. Use the following:

1. `private static final String PDF_SITE_URL="http://10.0.2.2/PHP/pdfstar";` - If you use default android emulator or bluestacks or any emulator not listed here.
2. `private static final String PDF_SITE_URL="http://10.0.3.2/PHP/pdfstar";` -If you use Genymotion emulator.
3. `private static final String PDF_SITE_URL="http://YOUR_IP_ADDRESS/PHP/pdfstar";` - If you use Nox Player.

We will show progressbar while downloading data:

```java
            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);
```

We'll make a HTTP GET request:

```java
            AndroidNetworking.get(PDF_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
```

And receive response in JSON format, parse this JSON and pass data to the adapter for data binding to the GridView:

```java
.getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            PDFDoc p;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("name");
                                    String category=jo.getString("category");
                                    String description=jo.getString("description");
                                    String pdfURL=jo.getString("pdf_url");
                                    String pdfIconURL=jo.getString("pdf_icon_url");

                                    p=new PDFDoc();
                                    p.setId(id);
                                    p.setName(name);
                                    p.setCategory(category);
                                    p.setCategory(description);
                                    p.setPdfURL(PDF_SITE_URL+pdfURL);
                                    p.setPdfIconURL(PDF_SITE_URL+pdfIconURL);

                                    pdfDocuments.add(p);
                                }
                                adapter =new GridViewAdapter(c,pdfDocuments);
                                gv.setAdapter(adapter);
                                myProgressBar.setVisibility(View.GONE);

                            }catch (JSONException e)
                            {
                                myProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        }
                        //ERROR
                        @Override
                        public void onError(ANError error) {
                            error.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+error.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
```

## **Start Download**

We will start the download of data when the `retrieveBtn` is clicked:

```java
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this).retrieve(myGridView,myProgressBar);
            }
        });
```

Here's the full source code:

## MainActivity.java

```java
package info.camposha.mysqlpdfs;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    public class PDFDoc {
        int id;
        String name,category,pdfURL,pdfIconURL;
        public int getId() {return id;}
        public void setId(int id) {this.id = id;}
        public String getName() {return name;}
        public void setName(String name) {this.name = name;}
        public String getAuthor() {return category;}
        public void setCategory(String category) {this.category = category;}
        public String getPdfURL() {return pdfURL;}
        public void setPdfURL(String pdfURL) {this.pdfURL = pdfURL;}
        public String getPdfIconURL() {return pdfIconURL;}
        public void setPdfIconURL(String pdfIconURL) {this.pdfIconURL = pdfIconURL;}
    }
    /*
    Our custom adapter class
     */
    public class GridViewAdapter extends BaseAdapter {
        Context c;
        ArrayList<PDFDoc> pdfDocuments;

        public GridViewAdapter(Context c, ArrayList<PDFDoc> pdfDocuments) {
            this.c = c;
            this.pdfDocuments = pdfDocuments;
        }
        @Override
        public int getCount() {return pdfDocuments.size();}
        @Override
        public Object getItem(int pos) {return pdfDocuments.get(pos);}
        @Override
        public long getItemId(int pos) {return pos;}
        @Override
        public View getView(int pos, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.pdfNameTxt);
            TextView txtAuthor = view.findViewById(R.id.authorTxt);
            ImageView pdfIcon = view.findViewById(R.id.imageView);

            final PDFDoc pdf= (PDFDoc) this.getItem(pos);

            txtName.setText(pdf.getName());
            txtAuthor.setText(pdf.getAuthor());

            if(pdf.getPdfURL() != null && pdf.getPdfURL().length()>0)
            {
                Picasso.get().load(pdf.getPdfIconURL()).placeholder(R.drawable.placeholder).into(pdfIcon);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.pdf_icon).into(pdfIcon);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, pdf.getName(), Toast.LENGTH_SHORT).show();
                    Intent i=new Intent(c,PDFActivity.class);
                    i.putExtra("PATH",pdf.getPdfURL());
                    c.startActivity(i);
                }
            });

            return view;
        }
    }
    /*
    Our HTTP Client
     */
    public class JSONDownloader {
        private static final String PDF_SITE_URL="http://192.168.12.2/PHP/pdfstar";
        private final Context c;
        private GridViewAdapter adapter ;

        public JSONDownloader(Context c) {
            this.c = c;
        }
        /*
        DOWNLOAD PDFS FROM MYSQL
         */
        public void retrieve(final GridView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<PDFDoc> pdfDocuments = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(PDF_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            PDFDoc p;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("name");
                                    String category=jo.getString("category");
                                    String description=jo.getString("description");
                                    String pdfURL=jo.getString("pdf_url");
                                    String pdfIconURL=jo.getString("pdf_icon_url");

                                    p=new PDFDoc();
                                    p.setId(id);
                                    p.setName(name);
                                    p.setCategory(category);
                                    p.setCategory(description);
                                    p.setPdfURL(PDF_SITE_URL+pdfURL);
                                    p.setPdfIconURL(PDF_SITE_URL+pdfIconURL);

                                    pdfDocuments.add(p);
                                }
                                adapter =new GridViewAdapter(c,pdfDocuments);
                                gv.setAdapter(adapter);
                                myProgressBar.setVisibility(View.GONE);

                            }catch (JSONException e)
                            {
                                myProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        }
                        //ERROR
                        @Override
                        public void onError(ANError error) {
                            error.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+error.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final GridView myGridView= findViewById(R.id.myGridView);
        Button btnRetrieve= findViewById(R.id.downloadBtn);
        final ProgressBar myProgressBar= findViewById(R.id.myProgressBar);

        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this).retrieve(myGridView,myProgressBar);
            }
        });
    }
}
```
