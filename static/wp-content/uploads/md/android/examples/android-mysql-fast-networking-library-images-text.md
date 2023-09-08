# Download Images Text

In this tutorial we want to see how to first upload images and text to MySQL database, the retrieve them and show them in a GridView or ListView. This is an android tutorial and our programming language is Java. The user will type name, description and choose an image from explorer using a Choose Dialog at runtime.

Then he clicks a button to send them to php mysql datatabase. As we upload we will show a progressbar. There is a button that when the user clicks a new activity is opened and data is automatically fetched from mysql database. The data is rendered in a custom gridview or listview as images and text inside a cardview.


#### What is MySQL?

MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language.

MySQL is available under both the GPL or proprietary licenses.

MySQL is currently developed by Oracle Corporation and was first released in 23 May 1995.

In this tutorial we will be saving our data to MySQL database.

You can find more information about MySQL [here](http://dev.mysql.com/doc/).

#### We are building a Community in our YouTube Channel

We have a YouTube Channel that is growing very fast. This is because we provide quality tutorials consistently. Moreover we attempt to answer questions from YouTube comments as opposed to through this site.

Here's this tutorial in vide format:

#### Introduction to PHP?

PHP is a popular general-purpose scripting language that is especially suited to web development.

Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.

##### PHP Hello World

```php
<?php
echo "Hello world";
```

PHP's website is [here](http://php.net/).

##### Classes

Class definitions start with the keyword `class`, followed by a class identifier, followed by a pair of curly braces which enclose the definitions of the properties and methods belonging to the class.

A class may contain its own constants, variables (called "properties"), and functions (called "methods").

Here's a simple class definition in PHP:

```php
<?php
class HelloClass
{
    // property declaration
    public $var = 'a default value';

    // method declaration
    public function displayVar() {
        echo $this->var;
    }
}
?>
```

You can then create an instance:

```php
<?php
$h = new HelloClass();

// This can also be done with a variable:
$className = 'HelloClass';
$h = new $className(); // new HelloClass()
?>
```

We will be working with PHP in an Object Oriented manner.

#### Why PHP

We need PHP or any server side language to connect to MySQL database. Android itself runs on the device and MySQL normally runs on the server.

So we alwyas need a server side language like PHP, then communicate via HTTP requests.

So

#### MySQLi

PHP has `mysqli` extension which allows us to access the functionality provided by MySQL 4.1 and above.

As an extension, `mysqli` exposes APIs to the PHP programmer, to allow us work with MySQL database programmatically.

Normally there are three ways(APIs) of working with MySQL from database:

1. PHP MySQLi extension.
2. PHP MySQL extension.
3. PHP Data Objects(PDO).

In this class we will use the most commonly used API which is `mysqli`.

#### Advantages of MySQLi

MySQLi is the most popular API for working with MySQL database because of the following reasons:

1. Provision of both Object Oriented and Procedural Interfaces.
2. Embedded Server support.
3. Support for Prepared Statements.
4. Ability to use Multiple Statements.
5. Transactions support.

etc

You can find more information about mysqli [here](http://php.net/manual/en/mysqli.overview.php).

#### Create MySQL Table

You need to create MySQL database then table.

I recommend you use tools like PHPMyAdmin and Adminer if you are a beginner.

I used the following command to create the table I'll use for this project:

```sql
CREATE TABLE `spiritualTeachersDB`.`spiritualTeachersTB` ( `id` INT NOT NULL AUTO_INCREMENT , `teacher_name` VARCHAR(100) NULL DEFAULT NULL , `teacher_description` VARCHAR(200) NULL DEFAULT NULL , `teacher_image_url` VARCHAR(100) NULL DEFAULT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

As you can see we have the table with the following structure:

1. `id` - int - autoincrement - primary.
2. `teacher_name` - varchar(100) - null.
3. `teacher_description` - varchar(200) - null.
4. `teacher_image_url` - varchar(100) - null.

#### Our PHP Code

First create a php file called `index.php` inside a folder.

Let that folder have an image called `images`. We'll use this images to store our images uploaded from android app. Then we will save the image urls in mysql database.

So we will have a project structure like this:

```shell
- SpiritualTeachers(Project Folder)
- - /images(Uploaded Images Folder)
- - index.php
```

Then we jump right in our code(index.php)

#### Create Database Constants class

Our `Constants` class will hold our database constants. These include the database server name, the database name, username and the password.

I create a user called `sisi` and password called `pass`.

If you don't know how to create a user then use `root` as username and `''`(empty) as password.

We'll also have a static variable that will define for us a sql statement for selecting everything from MySQL database.

```php
class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spiritualTeachersDB";
    static $USERNAME="sisi";
    static $PASSWORD="pass";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spiritualTeachersTB";
}
```

#### Perform PHP CRUD

We will create a class called `Spirituality`.

```php
class Spirituality
{
  ....
}
```

This class will:

1. Connect to MySQL database and return the `mysqli` connection Object.
2. Insert text and image urls to MySQL database.
3. Move the Uploaded Image to the `/images` folder.
4. Return a JSONObject response to the calling client.
5. Determine the Request that's been made, whether it is a HTTP GET or HTTP POST.

#### Connect

Here's how we connect:

```php
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
           // echo "Unable To Connect";
            return null;
        }else
        {
            return $con;
        }
    }
```

#### Inserting into MySQL

We will obtain the image, the teacher name and teacher description.

For the image we will store it in the `/images` directory and save it's path in the mysql database.

The others will be saved in the database. We will return a JSON response indicating either `Success` or the error.

```php
    public function insert()
    {
        // INSERT
        $con=$this->connect();
        if($con != null)
        {
            // Get image name
            $image_name = $_FILES['image']['name'];
            // Get text
            $teacher_name = mysqli_real_escape_string($con, $_POST['teacher_name']);
            $teacher_description = mysqli_real_escape_string($con, $_POST['teacher_description']);

            // image file directory
            $target = "images/".basename($image_name);
            $sql = "INSERT INTO spiritualTeachersTB (teacher_image_url, teacher_name,teacher_description) VALUES ('$image_name', '$teacher_name', '$teacher_description')";
            try
            {
                $result=$con->query($sql);
                if($result)
                {
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                       print(json_encode(array("message"=>"Success")));
                    }else{
                       print(json_encode(array("message"=>"Saved But Unable to Move Image to Appropriate Folder")));
                    }
                }else
                {
                    print(json_encode(array("message"=>"Unsuccessful. Connection was successful but data could not be Inserted.")));
                }
                $con->close();
            }catch (Exception $e)
            {
                print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T SAVE TO MYSQL. ".$e->getMessage())));
                $con->close();
            }
        }else{
            print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
```

#### Select From MySQL

We will also select from MySQL database and return the response in terms of JSON.

We use the `json_encode()` to encode an array int JSON format.

This JSON will then be parsed by our android app.

```php
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows > 0)
            {
                $spiritual_teachers=array();
                while($row=$result->fetch_array())
                {
                    array_push($spiritual_teachers, array("id"=>$row['id'],"teacher_name"=>$row['teacher_name'],"teacher_description"=>$row['teacher_description'],"teacher_image_url"=>$row['teacher_image_url']));
                }
                print(json_encode(array_reverse($spiritual_teachers)));
            }else
            {
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
```

##### Determine HTTP Request

We will determine the HTTP request that has been made. Whether it's a GET request so that we can SELECT data or POST request so that we can INSERT data to database.

```php
    public function handleRequest() {
        if (isset($_POST['name'])) {
            $this->insert();
        } else{
            $this->select();
        }
    }
```

##### Listen to Requests.

Lastly we will instantiate our `Spirituality` class and invoke the `handleRequest()` method.

```php
class Spirituality
{
    ...
}
$spirituality=new Spirituality();
$spirituality->handleRequest();
```

Check the Full PHP Code here:

```php
<?php

/*
 * Created by Oclemy for https://camposha.info and ProgrammingWizards TV.
 * User: Oclemy
 */
class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spiritualTeachersDB";
    static $USERNAME="sisi";
    static $PASSWORD="pass";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spiritualTeachersTB";
}

class Spirituality
{
    /*/
    /*
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
           // echo "Unable To Connect";
            return null;
        }else
        {
            return $con;
        }
    }
    public function insert()
    {
        // INSERT
        $con=$this->connect();
        if($con != null)
        {
            // Get image name
            $image_name = $_FILES['image']['name'];
            // Get text
            $teacher_name = mysqli_real_escape_string($con, $_POST['teacher_name']);
            $teacher_description = mysqli_real_escape_string($con, $_POST['teacher_description']);

            // image file directory
            $target = "images/".basename($image_name);
            $sql = "INSERT INTO spiritualTeachersTB (teacher_image_url, teacher_name,teacher_description) VALUES ('$image_name', '$teacher_name', '$teacher_description')";
            try
            {
                $result=$con->query($sql);
                if($result)
                {
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                       print(json_encode(array("message"=>"Success")));
                    }else{
                       print(json_encode(array("message"=>"Saved But Unable to Move Image to Appropriate Folder")));
                    }
                }else
                {
                    print(json_encode(array("message"=>"Unsuccessful. Connection was successful but data could not be Inserted.")));
                }
                $con->close();
            }catch (Exception $e)
            {
                print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T SAVE TO MYSQL. ".$e->getMessage())));
                $con->close();
            }
        }else{
            print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    /*/
    /*
       1.SELECT FROM DATABASE.
    */
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows > 0)
            {
                $spiritual_teachers=array();
                while($row=$result->fetch_array())
                {
                    array_push($spiritual_teachers, array("id"=>$row['id'],"teacher_name"=>$row['teacher_name'],"teacher_description"=>$row['teacher_description'],"teacher_image_url"=>$row['teacher_image_url']));
                }
                print(json_encode(array_reverse($spiritual_teachers)));
            }else
            {
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    public function handleRequest() {
        if (isset($_POST['name'])) {
            $this->insert();
        } else{
            $this->select();
        }
    }
}
$spirituality=new Spirituality();
$spirituality->handleRequest();
```

#### Introduction To Fast Android Networking

Fast Android Networking is an open source android HTTP library built by [Amit Shekhariitbhu](https://github.com/amitshekhariitbhu).

It's been growing in popularity very fast because it's not only fast but is also user friendly. Moreover it supports advanced capabilities and documentation is great.

It's also easy for teachers to use in examples because we can write decoupled code yet combine everything in one class so that students can conveniently copy paste and start editing.

He describes it as a Complete Fast Android Networking Library that also supports HTTP/2.

[Fast Networking Library](https://github.com/amitshekhariitbhu/Fast-Android-Networking) is built on top of [OkkHttp](http://square.github.io/okhttp/), a popular networking library built by Square.

Because Fast Networking Library is built on top of OkhttpLibrary which is built on top of Okio, it was not affected by the Android Engineers to get rid of HttpClient starting from Android M.

Many libraries were affected by this change.

Fast Android Networking library supports Android 2.3 and above.

To include it a project you use the following implementation statement. The version may change in future:

```java
implementation 'com.amitshekhar.android:android-networking:1.0.1'
```

Through this library we can make a HTTP GET, HTTP POST, upload data to server, download data from server etc.

In this example we will see how to perform a multi-part upload of images to server. We also send associated text that will be saved in MySQL database.

We also see how to make a HTTP GET request and download the uploaded data from mysql to our gridview.

#### Let's Write Some Code

#### Build.Gradle

First move over to you app leve build.gradle and specify dependencies.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support.constraint:constraint-layout:1.1.0'
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support:cardview-v7:26.+'
    implementation 'com.android.support:design:26.+'
    implementation 'com.amitshekhar.android:android-networking:1.0.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

1. Our MainActivity will be deriving from `AppCompatActivity` so we add the support appcompat.
2. Our GridView will comprise CardViews with images and text fetched from MySQL database. So we need to add the CardView support library.
3. We will be using `Fast Android Networking` library as we promised so we add it's implementation statement as a dependency.
4. We will use Picasso ImageLoader to download our images from our server based on the retrieved URLs. Picasso will also cache these images and show placeholder images.

#### AndroidManifest.xml

Normally to access internet you need to add permission in the manifest. So we do so.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.mrimageuploader">
    ...
    <uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android_name="android.permission.INTERNET" />
    ....
</manifest>
```

If you forget to add the internet permission you will not be able to make a HTTP request to the server.

#### Our XML Layouts

We wil have three layouts:

1. `activity_main.xml` - Will be our main activity's layout.
2. `activity_items.xml` - Will be our items activity's layout.
3. `row_model.xml` - Will be inflated into a single grid in our gridview.

#### activity_main.xml

At the root we will have a RelativeLayout. Then a TextView to display the header of our android app.

We will have a progressbar below the header label. This progressbar will be displayed while we send data to mysql database. It's an indeterminate progressbar. By default it's hidden and shown only when we are sending our data.

We will have edittexts to allow the user input data that will be saved to mysql database. We will also have two buttons. The first button initiates the connection to php mysql and sending of data.

The other button opens the ItemsActivity where all data will be rendered in a custom gridview.

Here's the full source code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mrimageuploader.MainActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers App"
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

    <LinearLayout
        android_layout_width="fill_parent"
        android_layout_height="match_parent"
        android_layout_marginTop="?attr/actionBarSize"
        android_orientation="vertical"
        android_paddingLeft="15dp"
        android_paddingRight="15dp"
        android_paddingTop="5dp">

            <EditText
                android_id="@+id/nameEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Name" />
            <EditText
                android_id="@+id/descriptionEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="Description" />

        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="horizontal">
            <ImageView
                android_id="@+id/imageView"
                android_layout_width="208dp"
                android_layout_height="wrap_content"
                android_layout_weight="1"
                app_srcCompat="@drawable/placeholder" />
            <Button
                android_id="@+id/chooseBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_weight="1"
                android_text="Choose Photo.." />
        </LinearLayout>
        <Button
            android_id="@+id/sendBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="5dp"
            android_background="@color/colorAccent"
            android_clickable="true"
            android_text="Send"
            android_textColor="@android:color/white" />
        <Button
            android_id="@+id/openActivityBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="5dp"
            android_background="@color/colorAccent"
            android_clickable="true"
            android_text="View All"
            android_textColor="@android:color/white" />

    </LinearLayout>

</RelativeLayout>
```

#### activity_items.xml

This layout will be inflated into the UI for our ItemsActivity. ItemsActivity is our activity responsible for rendering a GridView with data downloaded from mysql database.

At the root we will have a LinearLayout with vertical orientation. Then a Header label.

We will define an indeterminate progressbar that will show while the data is being downloaded from the server. This allows users to see the progress, or that atleast something is happening in the background. Incase of any error or successful completion, we dismiss the progressbar by setting it to `GONE`.

Then we will have a Gridview that will render our data downloaded from MYSQL.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.mrimageuploader.ItemsActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers List"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />
    <ProgressBar
        android_id="@+id/myDataLoaderProgressBar"
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

</LinearLayout>
```

#### row_model.xml

We will be downloading from php mysql both images and text. So we need a custom gridview because a simple gridview normally can only render simple texts.

We will therefore define a custom xml layout we call `row_model.xml` that will model each row or grid in our GridView.

We will render custom cardviews with both images and texts so we define that in the layout.

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
            android_padding="5dp"
            android_src="@drawable/placeholder"
            tools_scaleType="fitXY" />

        <TextView
            android_id="@+id/nameTextView"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentLeft="true"
            android_layout_below="@+id/imageView"
            android_padding="5dp"
            android_text="Teacher Name"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_textColor="@color/colorAccent" />

        <TextView
            android_id="@+id/descriptionTextView"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentLeft="true"
            android_layout_below="@+id/nameTextView"
            android_maxLines="3"
            android_padding="5dp"
            android_text=" Teacher Description --------------------"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_typeface="serif" />
    </RelativeLayout>

</android.support.v7.widget.CardView>
```

#### Our Java Classes

One of the things I have learnt from teaching coding and creating tutorials is that users like classes and files created being at a possible minimum. Many people, including myself, don't like having to create a bunch of files.

Yet this has to be balanced because I like writing decoupled code that is Object Oriented and organized in simple independent classes or modules.

So we will have only two files:

1. `MainActivity.java` - Will have two inner classes.
2. `ItemsActivity.java` - Will have three inner classes.

#### MainActivity.java

Let's start. This activity will be responsible for uploading both our images and text to the server and returning a response. Moreover, it receives and validates the user inputs. Also it shows a File Chooser Dialog to select image from file explorer.

```java
class MainActivity{
    class SpiritualTeacher{..}
    class MyUploader{..}
    ...
}
```

#### Create a POJO class

POJO stands fro Plain Old Java Object. We use it as a data object and is a good way of holding related data into a concrete data structure that can be accessed from anywhere yet the accessibility is controlled.

```java
    class SpiritualTeacher{
        private String name,description,imageURL;
        public SpiritualTeacher(String name, String description) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() {return description;}
    }
```

#### Create an Uploader class

A class responsible for, among other things, uploading images and text to MySQL database.

```java
public class MyUploader {..}
```

#### Accessing Localhost from Emulator\*

We need to now define the URL leading us to the PHP script that needs to be executed when we make a HTTP Request.

We are testing our app using an emulator. To do so also you need to keep several things in place. First the emulator is like a seperate computer in your machine. If you can access you server via `localhost` or `127.0.0.1` in you laptop/desktop, you cannot do the same in the emulator.

This because `localhost` address is used internally be the emulator. So normally people use `10.0.2.2` instead of `localhost`. This works in majority of emulators like the android emulator or bluestacks.

If you are using Genymotion, then use `10.0.3.2` if the above doesn't work.

I personally use Nox Player, which is fast enough for my slow and overworked machine. However, the above all don't work with Nox Player.

So in that case I use the IP Address of my machine. To obtain the IP Address you type `ipconfig/all` in the Command Prompt, then find the `IPv4`. It is normally something like this : `192.168.12.2`.

Howevr, if you use the IP Address then sometimes you get Forbidden error. This means that your server is not allowing remote connections. Remember you emulator is like a remote computer.

So in XAMPP and WAMP you normally need to edit the `http.config` file to allow as opposed to deny connections.

But me am using a portable wamp serever called Uniserver. With this it's even easier. All I have to do is edit my `.htaccess` by commenting the following like I have done:

```shell
# Order Deny,Allow
# Deny from all
# Allow from 127.0.0.1
```

Then I restart my Apache http server and that's it.

In our android code, make sure you supply the `index.php` for our POST request:

```php
        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator. Make sure you append
        //the `index.php` when making a POST request
        //Most emulators support this
        private static final String DATA_UPLOAD_URL="http://10.0.2.2/php/spiritualteachers/index.php";
        //if you use genymotion you can use this
        //private static final String DATA_UPLOAD_URL="http://10.0.3.2/php/spiritualteachers/index.php";
        //You can get your ip adrress by typing ipconfig/all in cmd
        //private static final String DATA_UPLOAD_URL="http://192.168.12.2/php/spiritualteachers/index.php";
```

#### Show ProgressBar while Uploading data To MySQL

All we need to do is set our progressbar to `VISIBLE` since we are using an indeterminate progressbar:

```java
uploadProgressBar.setVisibility(View.VISIBLE);
```

#### Multi-part Upload to Server

We said we use the Fast Networking libary. We use the upload method, passing in the Upload URL, specifying the image file we want to upload and associated parameters like name and description.

```java
                    AndroidNetworking.upload(DATA_UPLOAD_URL)
                        .addMultipartFile("image",imageFile)
                        .addMultipartParameter("teacher_name",s.getName())
                        .addMultipartParameter("teacher_description",s.getDescription())
                        .addMultipartParameter("name","upload")
                        .setTag("MYSQL_UPLOAD")
                        .setPriority(Priority.HIGH)
                        .build()
```

##### Listen To Reponse

We will listen to response from the server and handle it appropriately. The Server will respond with a JSON object either containing `Success` message or an exception/error message.

We will show these exceptions at runtime to give you an idea before digging through the logs. Basically the two types of errors you are likely to face are connection issues which you can test in the browser or JSONExceptions if your PHP code is not returning data in the correct format.

```java
                        .getAsJSONObject(new JSONObjectRequestListener() {
                            @Override
                            public void onResponse(JSONObject response) {
                                if(response != null) {
                                    try{
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get("message").toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_LONG).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameEditText = (EditText) inputViews[0];
                                        EditText descriptionEditText = (EditText) inputViews[1];
                                        ImageView teacherImageView = (ImageView) inputViews[2];

                                        nameEditText.setText("");
                                        descriptionEditText.setText("");
                                        teacherImageView.setImageResource(R.drawable.placeholder);

                                    } else {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_LONG).show();
                                    }
                                    }catch(Exception e)
                                    {
                                        e.printStackTrace();
                                        Toast.makeText(c, "JSONException "+e.getMessage(), Toast.LENGTH_LONG).show();
                                    }
                                }else{
                                    Toast.makeText(c, "NULL RESPONSE. ", Toast.LENGTH_LONG).show();
                                }
                                uploadProgressBar.setVisibility(View.GONE);
                            }
                            @Override
                            public void onError(ANError error) {
                                error.printStackTrace();
                                uploadProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : n"+error.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
            }
```

#### Show File Chooser and Return Image Path

The following code are meant to show us a File Choose Dialog. You are then required to chose the image from the File Explorer so that we can get the correct path of the image. Somethimes if you just choose an image like say from recent images, you will get a Toast message telling you to choose the image from the correct place. This is because we need the right Uri so that we can construct the image that we can then upload to the server.

```java
private void showFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image To Upload"), PICK_IMAGE_REQUEST);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
                teacherImageView.setImageBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String getImagePath(Uri uri)
    {
        String[] projection={MediaStore.Images.Media.DATA};
        Cursor cursor=getContentResolver().query(uri,projection,null,null,null);
        if(cursor == null){
            return null;
        }
        int columnIndex= cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String s=cursor.getString(columnIndex);
        cursor.close();
        return s;
    }
```

#### Validate Data to Be Sent to MySQL

We will provide a basic validation before we rove off the engines to the server.

```java
    private boolean validateData()
    {
        String name=nameEditText.getText().toString();
        String description=descriptionEditText.getText().toString();
        if( name == null || description == null){  return false;  }

        if(name == "" || description == ""){  return false;  }

        if(filePath == null){return false;}

        return true;
    }
```

#### Show File Chooser

When the choose button is clicked we will show file choose an pick images:

```java
        showChooserBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFileChooser();

            }
        });
```

#### Send Data to MySQL

We will do this when the send button is clicked. First we instantiate the `MyUploader` class and invoke the `upload()` method.

```java
        sendToMySQLBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (validateData()) {
                    //GET VALUES
                    String teacher_name = nameEditText.getText().toString();
                    String teacher_description = descriptionEditText.getText().toString();

                    SpiritualTeacher s = new SpiritualTeacher(teacher_name, teacher_description);

                    //upload data to mysql
                    new MyUploader(MainActivity.this).upload(s, nameEditText, descriptionEditText, teacherImageView);
                } else {
                    Toast.makeText(MainActivity.this, "PLEASE ENTER ALL FIELDS CORRECTLY ", Toast.LENGTH_LONG).show();
                }
            }
        });
```

#### Open ItemsActivity

When you click the openActivity button we will open the items activity where we will load data from mysql into our custom gridview:

```java
        openActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(MainActivity.this,ItemsActivity.class);
                startActivity(intent);
            }
        });
```

Here's the full source code for MainActivity:

```java
package info.camposha.mrimageuploader;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONObjectRequestListener;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    final int PICK_IMAGE_REQUEST = 234;
    private Uri filePath;
    EditText nameEditText,descriptionEditText;
    private ImageView teacherImageView;
    private Button showChooserBtn,sendToMySQLBtn;
    private ProgressBar uploadProgressBar;
    /*
    Our data object
     */
    class SpiritualTeacher{
        private String name,description,imageURL;
        public SpiritualTeacher(String name, String description) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() {return description;}
    }
    /*
    Uploader
     */
    public class MyUploader {
        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator. Make sure you append
        //the `index.php` when making a POST request
        //Most emulators support this
        private static final String DATA_UPLOAD_URL="http://10.0.2.2/php/spiritualteachers/index.php";
        //if you use genymotion you can use this
        //private static final String DATA_UPLOAD_URL="http://10.0.3.2/php/spiritualteachers/index.php";
        //You can get your ip adrress by typing ipconfig/all in cmd
        //private static final String DATA_UPLOAD_URL="http://192.168.12.2/php/spiritualteachers/index.php";

        //INSTANCE FIELDS
        private final Context c;
        public MyUploader(Context c) {this.c = c;}
        /*
        SAVE/INSERT
         */
        public void upload(SpiritualTeacher s, final View...inputViews)
        {
            if(s == null){Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();}
            else {
                File imageFile;
                try {
                    imageFile = new File(getImagePath(filePath));

                }catch (Exception e){
                    Toast.makeText(c, "Please pick an Image From Right Place, maybe Gallery or File Explorer so that we can get its path."+e.getMessage(), Toast.LENGTH_LONG).show();
                    return;
                }

                uploadProgressBar.setVisibility(View.VISIBLE);

                AndroidNetworking.upload(DATA_UPLOAD_URL)
                        .addMultipartFile("image",imageFile)
                        .addMultipartParameter("teacher_name",s.getName())
                        .addMultipartParameter("teacher_description",s.getDescription())
                        .addMultipartParameter("name","upload")
                        .setTag("MYSQL_UPLOAD")
                        .setPriority(Priority.HIGH)
                        .build()
                        .getAsJSONObject(new JSONObjectRequestListener() {
                            @Override
                            public void onResponse(JSONObject response) {
                                if(response != null) {
                                    try{
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get("message").toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_LONG).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameEditText = (EditText) inputViews[0];
                                        EditText descriptionEditText = (EditText) inputViews[1];
                                        ImageView teacherImageView = (ImageView) inputViews[2];

                                        nameEditText.setText("");
                                        descriptionEditText.setText("");
                                        teacherImageView.setImageResource(R.drawable.placeholder);

                                    } else {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_LONG).show();
                                    }
                                    }catch(Exception e)
                                    {
                                        e.printStackTrace();
                                        Toast.makeText(c, "JSONException "+e.getMessage(), Toast.LENGTH_LONG).show();
                                    }
                                }else{
                                    Toast.makeText(c, "NULL RESPONSE. ", Toast.LENGTH_LONG).show();
                                }
                                uploadProgressBar.setVisibility(View.GONE);
                            }
                            @Override
                            public void onError(ANError error) {
                                error.printStackTrace();
                                uploadProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : n"+error.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
            }
        }
    }

    private void showFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image To Upload"), PICK_IMAGE_REQUEST);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
                teacherImageView.setImageBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String getImagePath(Uri uri)
    {
        String[] projection={MediaStore.Images.Media.DATA};
        Cursor cursor=getContentResolver().query(uri,projection,null,null,null);
        if(cursor == null){
            return null;
        }
        int columnIndex= cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String s=cursor.getString(columnIndex);
        cursor.close();
        return s;
    }
    private boolean validateData()
    {
        String name=nameEditText.getText().toString();
        String description=descriptionEditText.getText().toString();
        if( name == null || description == null){  return false;  }

        if(name == "" || description == ""){  return false;  }

        if(filePath == null){return false;}

        return true;
    }

    /*
    OnCreate method. When activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nameEditText=findViewById(R.id.nameEditText);
        descriptionEditText=findViewById(R.id.descriptionEditText);
        showChooserBtn=findViewById(R.id.chooseBtn);
        sendToMySQLBtn=findViewById(R.id.sendBtn);
        Button openActivityBtn=findViewById(R.id.openActivityBtn);
        teacherImageView=findViewById(R.id.imageView);
        uploadProgressBar=findViewById(R.id.myProgressBar);

        showChooserBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFileChooser();

            }
        });

        sendToMySQLBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (validateData()) {
                    //GET VALUES
                    String teacher_name = nameEditText.getText().toString();
                    String teacher_description = descriptionEditText.getText().toString();

                    SpiritualTeacher s = new SpiritualTeacher(teacher_name, teacher_description);

                    //upload data to mysql
                    new MyUploader(MainActivity.this).upload(s, nameEditText, descriptionEditText, teacherImageView);
                } else {
                    Toast.makeText(MainActivity.this, "PLEASE ENTER ALL FIELDS CORRECTLY ", Toast.LENGTH_LONG).show();
                }
            }
        });

        openActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(MainActivity.this,ItemsActivity.class);
                startActivity(intent);
            }
        });
    }
}
```

#### ItemsActivity.java

Well this class will render our images and text from mysql server to our custom gridview with cardviews.

```java
class ItemsActivity
{
    class Teacher{}
    class GridviewAdapter{}
    class DataRetrieve{}
}
```

#### Create Data Object

We creae a data object to represent a single teacher:

```java
    class Teacher{
        private String name,description,imageURL;

        public Teacher(String name, String description, String imageURL) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() { return description; }
        public String getImageURL() { return imageURL; }
    }
```

#### Create Adapter for our GridView

The data we receive from mysql is images and text. So we need a custom adapter to render them.

We derive from BaseAdapter and implement several methods. We will use Picasso to load our images from the server.

```java
    public class GridViewAdapter extends BaseAdapter {
        Context c;
        ArrayList<Teacher> teachers;

        public GridViewAdapter(Context c, ArrayList<Teacher> teachers) {
            this.c = c;
            this.teachers = teachers;
        }
        @Override
        public int getCount() {return teachers.size();}
        @Override
        public Object getItem(int i) {return teachers.get(i);}
        @Override
        public long getItemId(int i) {return i;}
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.nameTextView);
            TextView txtDescription = view.findViewById(R.id.descriptionTextView);
            ImageView teacherImageView = view.findViewById(R.id.imageView);

            final Teacher teacher= (Teacher) this.getItem(i);

            txtName.setText(teacher.getName());
            txtDescription.setText(teacher.getDescription());

            if(teacher.getImageURL() != null && teacher.getImageURL().length() > 0)
            {
                Picasso.get().load(teacher.getImageURL()).placeholder(R.drawable.placeholder).into(teacherImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(teacherImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, teacher.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }
```

#### Retrieve Images and Text From MySQL

This class will download our data. We basically make a HTTP GET request which will return us a JSONArray containing teacher details and image url.

We will then use the URL to download the image asychronously via Picasso.

While downloading our data we will be showing a progressbar.

```java
    public class DataRetriever {

        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator
        private static final String PHP_MYSQL_SITE_URL="http://10.0.2.2/php/spiritualteachers";
        //For genymotion you can use this
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.3.2/php/spiritualteachers";
        //You can get your ip adrress by typing ipconfig/all in cmd
        //private static final String PHP_MYSQL_SITE_URL="http://192.168.12.2/php/spiritualteachers";
        //INSTANCE FIELDS
        private final Context c;
        private GridViewAdapter adapter ;

        public DataRetriever(Context c) { this.c = c; }
        /*
        RETRIEVE/SELECT/REFRESH
         */
        public void retrieve(final GridView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<Teacher> teachers = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(PHP_MYSQL_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Teacher teacher;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("teacher_name");
                                    String description=jo.getString("teacher_description");
                                    String imageURL=jo.getString("teacher_image_url");

                                    teacher=new Teacher(name,description,PHP_MYSQL_SITE_URL+"/images/"+imageURL);
                                    teachers.add(teacher);
                                }

                                //SET TO SPINNER
                                adapter =new GridViewAdapter(c,teachers);
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
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }
```

#### Start the Download

We will start the download when this activity is created:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_items);

        GridView myGridView=findViewById(R.id.myGridView);
        ProgressBar myDataLoaderProgressBar=findViewById(R.id.myDataLoaderProgressBar);

        new DataRetriever(ItemsActivity.this).retrieve(myGridView,myDataLoaderProgressBar);
    }
```

Here's the full source code of `ItemsActivity.java`:

```java
package info.camposha.mrimageuploader;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
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

public class ItemsActivity extends AppCompatActivity {

    class Teacher{
        private String name,description,imageURL;

        public Teacher(String name, String description, String imageURL) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() { return description; }
        public String getImageURL() { return imageURL; }
    }
    /*
   Our custom adapter class
    */
    public class GridViewAdapter extends BaseAdapter {
        Context c;
        ArrayList<Teacher> teachers;

        public GridViewAdapter(Context c, ArrayList<Teacher> teachers) {
            this.c = c;
            this.teachers = teachers;
        }
        @Override
        public int getCount() {return teachers.size();}
        @Override
        public Object getItem(int i) {return teachers.get(i);}
        @Override
        public long getItemId(int i) {return i;}
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.nameTextView);
            TextView txtDescription = view.findViewById(R.id.descriptionTextView);
            ImageView teacherImageView = view.findViewById(R.id.imageView);

            final Teacher teacher= (Teacher) this.getItem(i);

            txtName.setText(teacher.getName());
            txtDescription.setText(teacher.getDescription());

            if(teacher.getImageURL() != null && teacher.getImageURL().length() > 0)
            {
                Picasso.get().load(teacher.getImageURL()).placeholder(R.drawable.placeholder).into(teacherImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(teacherImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, teacher.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }
    /*
    Our HTTP Client
     */
    public class DataRetriever {

        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator
        private static final String PHP_MYSQL_SITE_URL="http://10.0.2.2/php/spiritualteachers";
        //For genymotion you can use this
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.3.2/php/spiritualteachers";
        //You can get your ip adrress by typing ipconfig/all in cmd
        //private static final String PHP_MYSQL_SITE_URL="http://192.168.12.2/php/spiritualteachers";
        //INSTANCE FIELDS
        private final Context c;
        private GridViewAdapter adapter ;

        public DataRetriever(Context c) { this.c = c; }
        /*
        RETRIEVE/SELECT/REFRESH
         */
        public void retrieve(final GridView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<Teacher> teachers = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(PHP_MYSQL_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Teacher teacher;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("teacher_name");
                                    String description=jo.getString("teacher_description");
                                    String imageURL=jo.getString("teacher_image_url");

                                    teacher=new Teacher(name,description,PHP_MYSQL_SITE_URL+"/images/"+imageURL);
                                    teachers.add(teacher);
                                }

                                //SET TO SPINNER
                                adapter =new GridViewAdapter(c,teachers);
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
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_items);

        GridView myGridView=findViewById(R.id.myGridView);
        ProgressBar myDataLoaderProgressBar=findViewById(R.id.myDataLoaderProgressBar);

        new DataRetriever(ItemsActivity.this).retrieve(myGridView,myDataLoaderProgressBar);
    }
}
```

#### Result

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQLGridViewImageUploader/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQLGridViewImageUploader) |
| 3. | YouTube | [Video Tutorial](https://youtu.be/Zur4HXRbCfU) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Example 2: Android PHP MySQL – Upload and Download Images and Text into ListView

_Android PHP MySQL Upload Images and Text to MySQL then Retrieve and Show in a custom [ListView](https://camposha.info/android/listview) Detailed Tutorial._

In this tutorial we want to see how to first upload images and text to MySQL database, the retrieve them and show them in a ListView. This is an android tutorial and our programming language is Java. The user will type name, description and choose an image from explorer using a Choose Dialog at runtime.

Then he clicks a button to send them to php mysql datatabase. As we upload we will show a progressbar. There is a button that when the user clicks a new [activity](https://camposha.info/android/activity) is opened and data is automatically fetched from mysql database. The data is rendered in a custom ListView as images and text inside a cardview.

<iframe width="788" height="443" src="https://www.youtube.com/embed/chQDjfRlMow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### PHP Code

Here's our PHP Code:

```php
<?php

/
 * Created by Oclemy for https://camposha.info and ProgrammingWizards TV.
 * User: Oclemy
 */
class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spiritualTeachersDB";
    static $USERNAME="sisi";
    static $PASSWORD="pass";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spiritualTeachersTB";
}

class Spirituality
{
    /*/
    /*
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
           // echo "Unable To Connect";
            return null;
        }else
        {
            return $con;
        }
    }
    public function insert()
    {
        // INSERT
        $con=$this->connect();
        if($con != null)
        {
            // Get image name
            $image_name = $_FILES['image']['name'];
            // Get text
            $teacher_name = mysqli_real_escape_string($con, $_POST['teacher_name']);
            $teacher_description = mysqli_real_escape_string($con, $_POST['teacher_description']);

            // image file directory
            $target = "images/".basename($image_name);
            $sql = "INSERT INTO spiritualTeachersTB (teacher_image_url, teacher_name,teacher_description) VALUES ('$image_name', '$teacher_name', '$teacher_description')";
            try
            {
                $result=$con->query($sql);
                if($result)
                {
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                       print(json_encode(array("message"=>"Success")));
                    }else{
                       print(json_encode(array("message"=>"Saved But Unable to Move Image to Appropriate Folder")));
                    }
                }else
                {
                    print(json_encode(array("message"=>"Unsuccessful. Connection was successful but data could not be Inserted.")));
                }
                $con->close();
            }catch (Exception $e)
            {
                print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T SAVE TO MYSQL. ".$e->getMessage())));
                $con->close();
            }
        }else{
            print(json_encode(array("message"=>"ERROR PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    /*/
    /*
       1.SELECT FROM DATABASE.
    */
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows > 0)
            {
                $spiritual_teachers=array();
                while($row=$result->fetch_array())
                {
                    array_push($spiritual_teachers, array("id"=>$row['id'],"teacher_name"=>$row['teacher_name'],"teacher_description"=>$row['teacher_description'],"teacher_image_url"=>$row['teacher_image_url']));
                }
                print(json_encode(array_reverse($spiritual_teachers)));
            }else
            {
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    public function handleRequest() {
        if (isset($_POST['name'])) {
            $this->insert();
        } else{
            $this->select();
        }
    }
}
$spirituality=new Spirituality();
$spirituality->handleRequest();
```

#### Build.Gradle

First move over to you app level `build.gradle` and specify dependencies.

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
}
```

1. Our MainActivity will be deriving from AppCompatActivity so we add the support appcompat.
2. Our [ListView](https://camposha.info/android/listview) will comprise CardViews with images and text fetched from MySQL database. So we need to add the CardView support library.
3. We will be using [Fast Android Networking library](https://camposha.info/android/fast-android-networking) as we promised so we add it's `implementation` statement as a dependency in our dependencies DSL.
4. We will use Picasso ImageLoader to download our images from our server based on the retrieved URLs. Picasso will also cache these images and show placeholder images.

#### AndroidManifest.xml

Normally to access internet you need to add permission in the manifest. So we do so.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.mysqlimagesuploaderlistview">
    ...
    <uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android_name="android.permission.INTERNET" />
    ....
</manifest>
```

If you forget to add the internet permission you will not be able to make a HTTP request to the server. We've added two permissions as you can see. The permission for internet connectivity as well as the permission for reading data from our external storage.

The former is because our data is being downloaded from the server hence we have to add the internet permission.

The latter is because we will be loading images from our file system via a File Chooser dialog.

#### Our XML Layouts

We wil have three layouts:

1. `activity_main.xml` - Will be our main activity's layout.
2. `activity_items.xml` - Will be our items activity's layout.
3. `row_model.xml` - Will be inflated into a single grid in our ListView.

#### activity_main.xml

This layout will get inflated into our main activity. Android Studio has generated for us starter code for this layout hence you can just replace them with the code below.

That inflation will happen in the [activity's](https://camposha.info/android/activity) `setContentView()` method. This layout will have the following widgets:

1. TextView.
2. Progressbar.
3. EditText.
4. ImageView.
5. Button.

At the root we will have a [RelativeLayout](https://camposha.info/android/relativelayout). Then a TextView to display the header of our android app.

We will have a progressbar below the header label. This progressbar will be displayed while we send data to mysql database. It's an indeterminate progressbar. By default it's hidden and shown only when we are sending our data.

We will have edittexts to allow the user input data that will be saved to mysql database. We will also have two buttons. The first button initiates the connection to php mysql and sending of data.

The other button opens the `ItemsActivity` where all data will be rendered in a custom [ListView](https://camposha.info/android/listview).

Here's the full source code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mysqlimagesuploaderlistview.MainActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers App"
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

    <LinearLayout
        android_layout_width="fill_parent"
        android_layout_height="match_parent"
        android_layout_marginTop="?attr/actionBarSize"
        android_orientation="vertical"
        android_paddingLeft="15dp"
        android_paddingRight="15dp"
        android_paddingTop="5dp">

        <EditText
            android_id="@+id/nameEditText"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_singleLine="true"
            android_hint= "Name" />
        <EditText
            android_id="@+id/descriptionEditText"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_hint="Description" />

        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="horizontal">
            <ImageView
                android_id="@+id/imageView"
                android_layout_width="208dp"
                android_layout_height="wrap_content"
                android_layout_weight="1"
                app_srcCompat="@drawable/placeholder" />
            <Button
                android_id="@+id/chooseBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_weight="1"
                android_text="Choose Photo.." />
        </LinearLayout>
        <Button
            android_id="@+id/sendBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="5dp"
            android_background="@color/colorAccent"
            android_clickable="true"
            android_text="Send"
            android_textColor="@android:color/white" />
        <Button
            android_id="@+id/openActivityBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="5dp"
            android_background="@color/colorAccent"
            android_clickable="true"
            android_text="View All"
            android_textColor="@android:color/white" />

    </LinearLayout>
</RelativeLayout>
```

#### activity_items.xml

This layout will be inflated into the UI for our `ItemsActivity`. `ItemsActivity` is our [activity](https://camposha.info/android/activity) responsible for rendering our [ListView](https://camposha.info/android/listview) with data downloaded from mysql database.

While the `activity_main` layout was responsible for data entry, this layout is responsible for data display. And our widget is indeed a ListView.

This layout will have the following widgets:

1. TextView.
2. ProgressBar.
3. [ListView](https://camposha.info/android/listview).

At the root we will have a [LinearLayout](https://camposha.info/android/linearlayout) with vertical orientation. Then a Header label.

We will define an indeterminate progressbar that will show while the data is being downloaded from the server. This allows users to see the progress, or that atleast something is happening in the background. Incase of any error or successful completion, we dismiss the progressbar by setting it to `GONE`.

Then we will have a `ListView` that will render our data downloaded from MYSQL.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.mysqlimagesuploaderlistview.ItemsActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers List"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />
    <ProgressBar
        android_id="@+id/myDataLoaderProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />
    <ListView
        android_id="@+id/myListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

</LinearLayout>
```

#### row_model.xml

We will be downloading from php mysql both images and text. So we need a custom [ListView](https://camposha.info/android/listview) because a simple ListView normally can only render simple texts.

We need a view that can render an imageview with multiple textviews around it.

We will therefore define a custom xml layout we call `row_model.xml` that will model each row or grid in our ListView.

We will render custom CardViews with both images and texts so we define that in the Layout.

This layout will have the following widgets:

1. ImageView.
2. TextView.

At the root remember we have a CardView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="10dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/teacherImageView"
            android_padding="5dp"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Teacher Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/teacherImageView" />
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Teacher Description..."
            android_id="@+id/descriptionTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/teacherImageView"
            android_layout_toRightOf="@+id/teacherImageView" />

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

#### Our Java Classes

One of the things I have learnt from teaching coding and creating tutorials is that users like classes and files created being at a possible minimum. Many people, including myself, don't like having to create a bunch of files.

Yet this has to be balanced because I like writing decoupled code that is Object Oriented and organized in simple independent classes or modules.

So we will have only two files:

1. `MainActivity.java` - Will have two inner classes.
2. `ItemsActivity.java` - Will have three inner classes.

#### MainActivity.java

Let's start. This [Activity](https://camposha.info/android/activity) will be responsible for uploading both our images and text to the server and returning a response. Moreover, it receives and validates the user inputs. Also it shows a File Chooser Dialog to select image from file explorer.

```java
class MainActivity{
    class SpiritualTeacher{..}
    class MyUploader{..}
    ...
}
```

#### Create a POJO class

POJO stands for Plain Old Java Object. We use it as a data object and is a good way of holding related data into a concrete data structure that can be accessed from anywhere yet the accessibility is controlled.

```java
    class SpiritualTeacher{
        private String name,description;
        public SpiritualTeacher(String name, String description) {
            this.name = name;
            this.description = description;
        }
        public String getName() {return name;}
        public String getDescription() {return description;}
    }
```

#### Create an Uploader class

A class responsible for, among other things, uploading images and text to MySQL database.

```java
public class MyUploader {..}
```

Well we will look at in detail later.

#### How do I Access Localhost from Emulator?

We need to now define the URL leading us to the PHP script that needs to be executed when we make a HTTP Request.

We are testing our app using an emulator. To do so also you need to keep several things in place. First the emulator is like a seperate computer in your machine. If you can access you server via `localhost` or `127.0.0.1` in you laptop/desktop, you **cannot** do the same in the emulator.

This because `localhost` address is used internally be the emulator. So normally people use `10.0.2.2` instead of `localhost`. This works in majority of emulators like the **default android emulator** and **bluestacks**.

If you are using **Genymotion**, then use `10.0.3.2` if the above doesn't work.

I personally use **Nox Player**, which I respect alot since it's fast enough for my slow and overworked machine. However, the above all don't work with Nox Player.

So in that case I use the **IP Address** of my machine. To obtain the IP Address you type `ipconfig/all` in the Command Prompt(Windows), then find the `IPv4`. It is normally something like this : `192.168.12.2`.

However, if you use the IP Address then sometimes you get Forbidden error. This means that your server is not allowing remote connections. Remember you emulator is like a remote computer.

So in XAMPP and WAMP you normally need to edit the `http.config` file to allow as opposed to deny connections.

But me am using a portable wamp server called **Uniserver**. With this it's even easier. All I have to do is edit my `.htaccess` by commenting the following like I have done:

```shell
# Order Deny,Allow
# Deny from all
# Allow from 127.0.0.1
```

Then I restart my Apache http server and that's it.

In our android code, make sure you supply the `index.php` for our POST request:

```php
        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator. Make sure you append
        //the `index.php` when making a POST request
        //Most emulators support this
        private static final String DATA_UPLOAD_URL="http://10.0.2.2/php/spiritualteachers/index.php";
        //if you use genymotion you can use this
        //private static final String DATA_UPLOAD_URL="http://10.0.3.2/php/spiritualteachers/index.php";
        //You can get your ip adrress by typing ipconfig/all in cmd
        //private static final String DATA_UPLOAD_URL="http://192.168.12.2/php/spiritualteachers/index.php";
```

#### Show ProgressBar while Uploading data To MySQL

All we need to do is set our progressbar to `VISIBLE` since we are using an indeterminate progressbar:

```java
uploadProgressBar.setVisibility(View.VISIBLE);
```

#### Multi-part Upload to Server

We said we use the Fast Networking libary. We use the upload method, passing in the Upload URL, specifying the image file we want to upload and associated parameters like name and description.

```java
                    AndroidNetworking.upload(DATA_UPLOAD_URL)
                        .addMultipartFile("image",imageFile)
                        .addMultipartParameter("teacher_name",s.getName())
                        .addMultipartParameter("teacher_description",s.getDescription())
                        .addMultipartParameter("name","upload")
                        .setTag("MYSQL_UPLOAD")
                        .setPriority(Priority.HIGH)
                        .build()
```

#### Listen To Reponse

We will listen to response from the server and handle it appropriately. The Server will respond with a JSON object either containing `Success` message or an exception/error message.

We will show these exceptions at runtime to give you an idea before digging through the logs. Basically the two types of errors you are likely to face are connection issues which you can test in the browser or JSONExceptions if your PHP code is not returning data in the correct format.

```java
                        .getAsJSONObject(new JSONObjectRequestListener() {
                            @Override
                            public void onResponse(JSONObject response) {
                                if(response != null) {
                                    try{
                                        //SHOW RESPONSE FROM SERVER
                                        String responseString = response.get("message").toString();
                                        Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_LONG).show();

                                        if (responseString.equalsIgnoreCase("Success")) {
                                            //RESET VIEWS
                                            EditText nameEditText = (EditText) inputViews[0];
                                            EditText descriptionEditText = (EditText) inputViews[1];
                                            ImageView teacherImageView = (ImageView) inputViews[2];

                                            nameEditText.setText("");
                                            descriptionEditText.setText("");
                                            teacherImageView.setImageResource(R.drawable.placeholder);

                                        } else {
                                            Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_LONG).show();
                                        }
                                    }catch(Exception e)
                                    {
                                        e.printStackTrace();
                                        Toast.makeText(c, "JSONException "+e.getMessage(), Toast.LENGTH_LONG).show();
                                    }
                                }else{
                                    Toast.makeText(c, "NULL RESPONSE. ", Toast.LENGTH_LONG).show();
                                }
                                uploadProgressBar.setVisibility(View.GONE);
                            }
                            @Override
                            public void onError(ANError error) {
                                error.printStackTrace();
                                uploadProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : n"+error.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
            }
        }
    }
```

#### Show File Chooser and Return Image Path

The following code are meant to show us a File Choose Dialog. You are then required to chose the image from the File Explorer so that we can get the correct path of the image. Somethimes if you just choose an image like say from recent images, you will get a Toast message telling you to choose the image from the correct place. This is because we need the right Uri so that we can construct the image that we can then upload to the server.

```java
    private void showFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image To Upload"), PICK_IMAGE_REQUEST);
    }
    /*
    Receive Image data from FileChooser and set it to ImageView as Bitmap
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
                teacherImageView.setImageBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

#### Validate Data to Be Sent to MySQL

We will provide a basic validation before we rove off the engines to the server. We are checking that we have both the name, description as well as the image.

```java
    private boolean validateData()
    {
        String name=nameEditText.getText().toString();
        String description=descriptionEditText.getText().toString();
        if( name == null || description == null){  return false;  }

        if(name == "" || description == ""){  return false;  }

        if(filePath == null){return false;}

        return true;
    }
```

#### Show File Chooser

When the choose button is clicked we will show file choose an pick images:

```java
        showChooserBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFileChooser();

            }
        });
```

#### Send Data to MySQL

We will do this when the send button is clicked. First we instantiate the `MyUploader` class and invoke the `upload()` method.

```java
        sendToMySQLBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (validateData()) {
                    //GET VALUES
                    String teacher_name = nameEditText.getText().toString();
                    String teacher_description = descriptionEditText.getText().toString();

                    SpiritualTeacher s = new SpiritualTeacher(teacher_name, teacher_description);

                    //upload data to mysql
                    new MyUploader(MainActivity.this).upload(s, nameEditText, descriptionEditText, teacherImageView);
                } else {
                    Toast.makeText(MainActivity.this, "PLEASE ENTER ALL FIELDS CORRECTLY ", Toast.LENGTH_LONG).show();
                }
            }
        });
```

#### Open ItemsActivity

When you click the openActivity button we will open the items activity where we will load data from mysql into our custom ListView:

```java
        openActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(MainActivity.this,ItemsActivity.class);
                startActivity(intent);
            }
        });
```

Here's the full source code for **MainActivity**:

```java
package info.camposha.mysqlimagesuploaderlistview;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONObjectRequestListener;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    final int PICK_IMAGE_REQUEST = 234;
    private Uri filePath;
    EditText nameEditText,descriptionEditText;
    private ImageView teacherImageView;
    private Button showChooserBtn,sendToMySQLBtn;
    private ProgressBar uploadProgressBar;
    /******************************************************************************/

    /*
    Our data object. THE POJO CLASS
     */
    class SpiritualTeacher{
        private String name,description;
        public SpiritualTeacher(String name, String description) {
            this.name = name;
            this.description = description;
        }
        public String getName() {return name;}
        public String getDescription() {return description;}
    }
    /******************************************************************************/
    /*
    CLASS TO UPLOAD BOTH IMAGES AND TEXT
     */
    public class MyUploader {
        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator. Make sure you append
        //the `index.php` when making a POST request
        //Most emulators support this
        //private static final String DATA_UPLOAD_URL="http://10.0.2.2/php/spiritualteachers/index.php";
        //if you use genymotion you can use this
        //private static final String DATA_UPLOAD_URL="http://10.0.3.2/php/spiritualteachers/index.php";
        //You can get your ip adrress by typing ipconfig/all in cmd
        private static final String DATA_UPLOAD_URL="http://192.168.12.2/php/spiritualteachers/index.php";

        //INSTANCE FIELDS
        private final Context c;
        public MyUploader(Context c) {this.c = c;}
        /*
        SAVE/INSERT
         */
        public void upload(SpiritualTeacher s, final View...inputViews)
        {
            if(s == null){Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();}
            else {
                File imageFile;
                try {
                    imageFile = new File(getImagePath(filePath));

                }catch (Exception e){
                    Toast.makeText(c, "Please pick an Image From Right Place, maybe Gallery or File Explorer so that we can get its path."+e.getMessage(), Toast.LENGTH_LONG).show();
                    return;
                }

                uploadProgressBar.setVisibility(View.VISIBLE);

                AndroidNetworking.upload(DATA_UPLOAD_URL)
                        .addMultipartFile("image",imageFile)
                        .addMultipartParameter("teacher_name",s.getName())
                        .addMultipartParameter("teacher_description",s.getDescription())
                        .addMultipartParameter("name","upload")
                        .setTag("MYSQL_UPLOAD")
                        .setPriority(Priority.HIGH)
                        .build()
                        .getAsJSONObject(new JSONObjectRequestListener() {
                            @Override
                            public void onResponse(JSONObject response) {
                                if(response != null) {
                                    try{
                                        //SHOW RESPONSE FROM SERVER
                                        String responseString = response.get("message").toString();
                                        Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_LONG).show();

                                        if (responseString.equalsIgnoreCase("Success")) {
                                            //RESET VIEWS
                                            EditText nameEditText = (EditText) inputViews[0];
                                            EditText descriptionEditText = (EditText) inputViews[1];
                                            ImageView teacherImageView = (ImageView) inputViews[2];

                                            nameEditText.setText("");
                                            descriptionEditText.setText("");
                                            teacherImageView.setImageResource(R.drawable.placeholder);

                                        } else {
                                            Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_LONG).show();
                                        }
                                    }catch(Exception e)
                                    {
                                        e.printStackTrace();
                                        Toast.makeText(c, "JSONException "+e.getMessage(), Toast.LENGTH_LONG).show();
                                    }
                                }else{
                                    Toast.makeText(c, "NULL RESPONSE. ", Toast.LENGTH_LONG).show();
                                }
                                uploadProgressBar.setVisibility(View.GONE);
                            }
                            @Override
                            public void onError(ANError error) {
                                error.printStackTrace();
                                uploadProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : n"+error.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
            }
        }
    }
    /******************************************************************************/

    /*
    Show File Chooser Dialog
     */
    private void showFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image To Upload"), PICK_IMAGE_REQUEST);
    }
    /*
    Receive Image data from FileChooser and set it to ImageView as Bitmap
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
                teacherImageView.setImageBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /*
    Get Image Path propvided its  android.net.Uri
     */
    public String getImagePath(Uri uri)
    {
        String[] projection={MediaStore.Images.Media.DATA};
        Cursor cursor=getContentResolver().query(uri,projection,null,null,null);
        if(cursor == null){
            return null;
        }
        int columnIndex= cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String s=cursor.getString(columnIndex);
        cursor.close();
        return s;
    }
    /*
    Perform basic data validation
     */
    private boolean validateData()
    {
        String name=nameEditText.getText().toString();
        String description=descriptionEditText.getText().toString();
        if( name == null || description == null){  return false;  }

        if(name == "" || description == ""){  return false;  }

        if(filePath == null){return false;}

        return true;
    }

    /*
    OnCreate method. When activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nameEditText=findViewById(R.id.nameEditText);
        descriptionEditText=findViewById(R.id.descriptionEditText);
        showChooserBtn=findViewById(R.id.chooseBtn);
        sendToMySQLBtn=findViewById(R.id.sendBtn);
        Button openActivityBtn=findViewById(R.id.openActivityBtn);
        teacherImageView=findViewById(R.id.imageView);
        uploadProgressBar=findViewById(R.id.myProgressBar);

        showChooserBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFileChooser();

            }
        });

        sendToMySQLBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (validateData()) {
                    //GET VALUES
                    String teacher_name = nameEditText.getText().toString();
                    String teacher_description = descriptionEditText.getText().toString();

                    SpiritualTeacher s = new SpiritualTeacher(teacher_name, teacher_description);

                    //upload data to mysql
                    new MyUploader(MainActivity.this).upload(s, nameEditText, descriptionEditText, teacherImageView);
                } else {
                    Toast.makeText(MainActivity.this, "PLEASE ENTER ALL FIELDS CORRECTLY ", Toast.LENGTH_LONG).show();
                }
            }
        });

        openActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(MainActivity.this,ItemsActivity.class);
                startActivity(intent);
            }
        });
    }
}
```

#### ItemsActivity.java

Well this class will render our images and text from mysql server to our custom ListView with cardviews.

```java
class ItemsActivity
{
    class Teacher{}
    class ListViewAdapter{}
    class DataRetriever{}
}
```

#### Create Data Object

We create a data object to represent a single teacher. The teacher will have a name, description and image.

```java
    class Teacher{
        private String name,description,imageURL;

        public Teacher(String name, String description, String imageURL) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() { return description; }
        public String getImageURL() { return imageURL; }
    }
```

#### Create Adapter for our ListView

The data we receive from mysql is images and text. So we need a custom adapter to render them.

We derive from BaseAdapter and implement several methods. We will use Picasso to load our images from the server.

```java
    public class ListViewAdapter extends BaseAdapter {
        Context c;
        ArrayList<Teacher> teachers;

        public ListViewAdapter(Context c, ArrayList<Teacher> teachers) {
            this.c = c;
            this.teachers = teachers;
        }
        @Override
        public int getCount() {return teachers.size();}
        @Override
        public Object getItem(int i) {return teachers.get(i);}
        @Override
        public long getItemId(int i) {return i;}
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.nameTextView);
            TextView txtDescription = view.findViewById(R.id.descriptionTextView);
            ImageView teacherImageView = view.findViewById(R.id.teacherImageView);

            final Teacher teacher= (Teacher) this.getItem(i);

            txtName.setText(teacher.getName());
            txtDescription.setText(teacher.getDescription());

            if(teacher.getImageURL() != null && teacher.getImageURL().length() > 0)
            {
                Picasso.get().load(teacher.getImageURL()).placeholder(R.drawable.placeholder).into(teacherImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(teacherImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, teacher.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }
```

#### Retrieve Images and Text From MySQL

This class will download our data. It is our HTTP Client class. We basically make a HTTP GET request which will return us a JSONArray containing teacher details and image url.

We will then use the URL to download the image asychronously via Picasso.

While downloading our data we will be showing a progressbar.

```java
    public class DataRetriever {

        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.2.2/php/spiritualteachers";
        //For genymotion you can use this
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.3.2/php/spiritualteachers";
        //You can get your ip adrress by typing ipconfig/all in cmd
        private static final String PHP_MYSQL_SITE_URL="http://192.168.12.2/php/spiritualteachers";
        //INSTANCE FIELDS
        private final Context c;
        private ListViewAdapter adapter ;

        public DataRetriever(Context c) { this.c = c; }
        /*
        RETRIEVE/SELECT/REFRESH
         */
        public void retrieve(final ListView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<Teacher> teachers = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(PHP_MYSQL_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Teacher teacher;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("teacher_name");
                                    String description=jo.getString("teacher_description");
                                    String imageURL=jo.getString("teacher_image_url");

                                    teacher=new Teacher(name,description,PHP_MYSQL_SITE_URL+"/images/"+imageURL);
                                    teachers.add(teacher);
                                }

                                //SET TO SPINNER
                                adapter =new ListViewAdapter(c,teachers);
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
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }
```

#### Start the Download

We will start the download when this activity is created:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_items);

        GridView myGridView=findViewById(R.id.myGridView);
        ProgressBar myDataLoaderProgressBar=findViewById(R.id.myDataLoaderProgressBar);

        new DataRetriever(ItemsActivity.this).retrieve(myGridView,myDataLoaderProgressBar);
    }
```

Here's the full source code of `ItemsActivity.java`:

```java
package info.camposha.mysqlimagesuploaderlistview;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
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

public class ItemsActivity extends AppCompatActivity {
    class Teacher{
        private String name,description,imageURL;

        public Teacher(String name, String description, String imageURL) {
            this.name = name;
            this.description = description;
            this.imageURL = imageURL;
        }
        public String getName() {return name;}
        public String getDescription() { return description; }
        public String getImageURL() { return imageURL; }
    }
    /*
   Our custom adapter class
    */
    public class ListViewAdapter extends BaseAdapter {
        Context c;
        ArrayList<Teacher> teachers;

        public ListViewAdapter(Context c, ArrayList<Teacher> teachers) {
            this.c = c;
            this.teachers = teachers;
        }
        @Override
        public int getCount() {return teachers.size();}
        @Override
        public Object getItem(int i) {return teachers.get(i);}
        @Override
        public long getItemId(int i) {return i;}
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.nameTextView);
            TextView txtDescription = view.findViewById(R.id.descriptionTextView);
            ImageView teacherImageView = view.findViewById(R.id.teacherImageView);

            final Teacher teacher= (Teacher) this.getItem(i);

            txtName.setText(teacher.getName());
            txtDescription.setText(teacher.getDescription());

            if(teacher.getImageURL() != null && teacher.getImageURL().length() > 0)
            {
                Picasso.get().load(teacher.getImageURL()).placeholder(R.drawable.placeholder).into(teacherImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(teacherImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, teacher.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }
    /*
    Our HTTP Client
     */
    public class DataRetriever {

        //YOU CAN USE EITHER YOUR IP ADDRESS OR  10.0.2.2 I depends on the Emulator
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.2.2/php/spiritualteachers";
        //For genymotion you can use this
        //private static final String PHP_MYSQL_SITE_URL="http://10.0.3.2/php/spiritualteachers";
        //You can get your ip adrress by typing ipconfig/all in cmd
        private static final String PHP_MYSQL_SITE_URL="http://192.168.12.2/php/spiritualteachers";
        //INSTANCE FIELDS
        private final Context c;
        private ListViewAdapter adapter ;

        public DataRetriever(Context c) { this.c = c; }
        /*
        RETRIEVE/SELECT/REFRESH
         */
        public void retrieve(final ListView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<Teacher> teachers = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(PHP_MYSQL_SITE_URL)
                    .setPriority(Priority.MEDIUM)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Teacher teacher;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("teacher_name");
                                    String description=jo.getString("teacher_description");
                                    String imageURL=jo.getString("teacher_image_url");

                                    teacher=new Teacher(name,description,PHP_MYSQL_SITE_URL+"/images/"+imageURL);
                                    teachers.add(teacher);
                                }

                                //SET TO SPINNER
                                adapter =new ListViewAdapter(c,teachers);
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
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_items);

        ListView myGridView=findViewById(R.id.myListView);
        ProgressBar myDataLoaderProgressBar=findViewById(R.id.myDataLoaderProgressBar);

        new DataRetriever(ItemsActivity.this).retrieve(myGridView,myDataLoaderProgressBar);
    }
}
```

#### Result

#### Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQLImagesUploaderListView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQLImagesUploaderListView) |
