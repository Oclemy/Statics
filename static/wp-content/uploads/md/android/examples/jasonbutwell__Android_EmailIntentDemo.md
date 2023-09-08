# Android Email Intent Demo

>  A short demo that illustrates how to send an email as an Intent within an android mobile application.

Let us look at a full android Email Intent sample project.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `INTERNET` permission.
2. Our `SEND_SMS` permission.
3. Our `READ_EXTERNAL_STORAGE` permission.
4. Our `WRITE_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jasonbutwell.emailintentdemo">

    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.SEND_SMS"/>

    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 2. Design Layouts

Let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following 4 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `EditText`
3. `TextView`
4. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:background="@drawable/my_custom_background"
    tools:context="com.jasonbutwell.emailintentdemo.MainActivity">

    <EditText
        android:background="@drawable/back"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPersonName"
        android:text=""
        android:hint="@string/enter_your_name"
        android:ems="10"
        android:layout_below="@+id/emailTitleID"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_marginTop="17dp"
        android:id="@+id/Name"
        android:lines="1"
        android:textSize="14sp" />

    <EditText
        android:background="@drawable/back"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="phone"
        android:text=""
        android:hint="@string/enter_your_phone_number"
        android:ems="10"
        android:layout_marginTop="18dp"
        android:id="@+id/PhoneNo"
        android:lines="1"
        android:layout_below="@+id/Name"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:textSize="14sp" />

    <EditText
        android:background="@drawable/back"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="text"
        android:text=""
        android:hint="@string/enter_your_subject"
        android:ems="10"
        android:layout_marginTop="18dp"
        android:id="@+id/subject"
        android:lines="1"
        android:layout_below="@+id/PhoneNo"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:textSize="14sp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/send_us_an_email"
        android:id="@+id/emailTitleID"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <EditText
        android:background="@drawable/back"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textMultiLine"
        android:text=""
        android:hint="@string/enter_your_message_here"
        android:ems="10"
        android:id="@+id/Message"
        android:lines="6"
        android:minLines="6"
        android:maxLines="10"
        android:scrollbars="vertical"
        android:textSize="14sp"
        android:layout_marginTop="24dp"
        android:layout_below="@+id/subject"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <Button
        android:background="@drawable/button_shape"
        android:text="@string/send"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="34dp"
        android:id="@+id/sendButton"
        android:textColor="@android:color/white"
        android:textSize="16sp"
        android:onClick="sendEmail"
        android:layout_below="@+id/Message"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <Button
        android:background="@drawable/button_shape"
        android:text="@string/sendtext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/sendButton2"
        android:textColor="@android:color/white"
        android:textSize="16sp"
        android:onClick="sendText"
        android:layout_alignBaseline="@+id/sendButton"
        android:layout_alignBottom="@+id/sendButton"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true" />

    <Button
        android:background="@drawable/button_shape"
        android:text="@string/open_web_page"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/sendButton3"
        android:textColor="@android:color/white"
        android:textSize="16sp"
        android:onClick="openWebPage"
        android:layout_alignBaseline="@+id/sendButton2"
        android:layout_alignBottom="@+id/sendButton2"
        android:layout_centerHorizontal="true" />

    <Button
        android:text="Button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/sendButton3"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="48dp"
        android:id="@+id/openGalleryButton"
        android:onClick="openGallery" />
</RelativeLayout>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Then create a class that extends `AppCompatActivity` and add its contents as follows:

We will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.
2. `Cursor` from the `android.database` package.
3. `Uri` from the `android.net` package.
4. `Bundle` from the `android.os` package.
5. `MediaStore` from the `android.provider` package.
6. `AppCompatActivity` from the `android.support.v7.app` package.
7. `Log` from the `android.util` package.
8. `View` from the `android.view` package.
9. `EditText` from the `android.widget` package.
10. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundl)`.
2. `onActivityResult(int)`.

We will be creating the following methods:

1. `openGallery(View view)`.
2. `openWebPage(View view)`.
3. `sendText(View view )`.
4. `sendEmail(View view)`.

Here is the full java code for this class:

```java
package replace_with_your_package_name;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.io.File;

public class MainActivity extends AppCompatActivity {

    int REQUEST_CODE_LOAD_IMAGE = 101;
    String picturePath;
    Uri imagepath;

    private EditText name, phone, subject, message;

    Intent smsIntent, emailIntent, chooserIntent = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        name = (EditText)findViewById(R.id.Name);
        phone = (EditText)findViewById(R.id.PhoneNo);
        subject = (EditText)findViewById(R.id.subject);
        message = (EditText)findViewById(R.id.Message);
    }

    public void openGallery(View view) {

        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        intent.putExtra("return-data",true);
        startActivityForResult(Intent.createChooser(intent,"Compete Action Using"),REQUEST_CODE_LOAD_IMAGE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE_LOAD_IMAGE && resultCode == RESULT_OK && null != data) {

            Uri selectedImage = data.getData();
            String[] filePathColumn = { MediaStore.Images.Media.DATA };

            Cursor cursor = getContentResolver().query(selectedImage, filePathColumn, null, null, null);
            cursor.moveToFirst();

            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
            picturePath = cursor.getString(columnIndex);
            cursor.close();

            imagepath = selectedImage;

            Log.i("file",selectedImage.toString());

        }
    }

    public void openWebPage(View view) {
        String url="http://www.google.com";

        Intent webIntent = new Intent(Intent.ACTION_VIEW);
        webIntent.setData(Uri.parse(url));
        startActivity(webIntent);
    }

    public void sendText( View view ) {
        smsIntent = new Intent(Intent.ACTION_VIEW);

        String bodyTextSMS = "SMS From: " + name.getText().toString() + ", Phone number: " + phone.getText().toString() + "\n\n"+ message.getText().toString();

        smsIntent.putExtra("sms_body",bodyTextSMS);
        smsIntent.setType("vnd.android-dir/mms-sms");
        smsIntent.setData(Uri.parse("sms:07475653985"));

        startActivity(smsIntent);
    }

    public void sendEmail(View view) {

        boolean successful = true;

        if ( name.length() < 1 || phone.length() < 1 || subject.length() < 1 || message.length() < 1 )
            successful = false;

        if ( !successful )
            Toast.makeText(getApplicationContext(),"Please fill out all required fields",Toast.LENGTH_LONG).show();
        else {
            emailIntent = new Intent(Intent.ACTION_SEND);
            emailIntent.setData(Uri.parse("mailto:"));

            String[] to = {"jasonbutwell@gmail.com"};

            emailIntent.putExtra(Intent.EXTRA_EMAIL, to);
            emailIntent.putExtra(Intent.EXTRA_SUBJECT, subject.getText().toString());

            String bodyTextEmail = "Email from: " + name.getText().toString() + ", Phone number: " + phone.getText().toString() + "\n\n"+ message.getText().toString();

            emailIntent.putExtra(Intent.EXTRA_TEXT, bodyTextEmail);
            emailIntent.setType("message/rfc822");

            if ( imagepath != null ) {
                File file = new File(this.getFilesDir().getAbsolutePath()+picturePath);
                emailIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                emailIntent.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                emailIntent.setType("image/jpeg");
                emailIntent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://"+file.getAbsolutePath())); //Your image file
            }

            chooserIntent = Intent.createChooser(emailIntent, "Send Email");
            startActivity(chooserIntent);
        }
    }

}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/jasonbutwell/Android_EmailIntentDemo/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/jasonbutwell/Android_EmailIntentDemo).|
|3.|Follow code author [here](https://github.com/jasonbutwell).|
