# DownloadManager Tutorial and Examples


> Android DownloadManager Tutorial and Examples.

In this session we explore the `android.app.DownloadManager` class, how to use it and why it's important.We will look at issues like the types of downloads you can make with `DownloadManager` class, how to make the actual requests, how to show progress in status bar via noification, open downloaded file and even remove.


### What is DownloadManager?

_The `DownloadManager` is a system service which we can use to handle long running downloads._

### Why Download?

Don't underestimate the need for downloads and how complex it can get. The state of bandwith in the current era implies that we are still not able, at least in many parts of the world, to be able to obtain files we need on demand any time. Users don't leave their internet on all time as it does cost money and drain the device's battery.

Hence being able to download files and store them locally is important. But this is not an easy task to implement properly. Especially doing it correctly and efficiently. Yet it is one of those tasks that can absolutely be shared among apps. There is no real need most of the time to re-invent the wheel while making http downloads. It makes sense to have one simple to use class that can do this efficiently and inform our app when the task is complete.

Being able to download data is powerful way of enriching our apps as we can get files from the internet which our app can then use. If the user happens to remove the file, we can re-download it again.

### Common Questions

Here are some of the questions to allow us understand the `DownloadManager` class.

#### Which Types of Downloads are Handled by `DownloadManager`

Normally there are several protocols for communications across devices. And certainly download a file is just a form or communicating between atleast two devices. One device supplying a file while another receiving it. Beware the `DownloadManager` is used to handle only `HTTP` downloads.

`DownloadManager` is especially useful if your downlaods are long running.

#### Where Do the Downloads take Place?

Where with regards to [threads](https://camposha.info/android/thread). Well the downloads will definitely take place in the background thread.

#### Why Use the DownloadManager?

Well what are it's advantages? Well we have several. For example

1. As we said the downloads take place in the background thread. In fact in a background in a system app. This means our app doesn't have to handle the downloads manually in our main thread hence our UI is always responsive. This fact is quite important. Downloading data is one of the most time and resource consuming tasks personal gadgets do. Yet it is one of those tasks that really make devices as powerful as they are. So we have to do them. But we have to do them in a background thread and `DownloadManager` definitely obeys that.
2. Secondly the HTTP interactions are abstracted away from us. We don't have to worry about variou HTTP codes and messages and possible failures. In fact even retries are made on our behalf. Yet these retries can amazingly be persisted through connectivity state changes and system reboots. Progress can be shown to us as the download takes place hence making it very user friendly.

#### DownloadManager Quick HowTos and Snippets

##### 1\. How to download videos using DownloadManager class

We want to download videos using the DownloadManager class in android. We want to give them appropriate names and store them in external storage.

```java
    public void downloadvideo(String videoURL)
    {
        if(videoURL.contains(".mp4"))
        {
            File directory = new File(Environment.getExternalStorageDirectory()+File.separator+"My Videos");
            directory.mkdirs();
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(videoURL));
            int Number=pref.getFileName();
            request.allowScanningByMediaScanner();
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE);
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            File root = new File(Environment.getExternalStorageDirectory() + File.separator+"Facebook Videos");
            Uri path = Uri.withAppendedPath(Uri.fromFile(root), "Video-"+Number+".mp4");
            request.setDestinationUri(path);
            DownloadManager dm = (DownloadManager)getActivity().getSystemService(getActivity().DOWNLOAD_SERVICE);
            if(downloadlist.contains(videoURL))
            {
                Toast.makeText(getActivity().getApplicationContext(),"The Video is Already Downloading",Toast.LENGTH_LONG).show();
            }
            else
            {
                downloadlist.add(videoURL);
                dm.enqueue(request);
                Toast.makeText(getActivity().getApplicationContext(),"Downloading Video-"+Number+".mp4",Toast.LENGTH_LONG).show();
                Number++;
                pref.setFileName(Number);
            }

        }
    }
```

First we have been passed the video url as a parameter. Let' say we want to download only mp4 files, so we provide a simple boolean check to check if it `contains` mp4. Maybe you could use `endsWith()` if you like instead of `contains()`.

# DownloadManager Examples

Let's look at some `DownloadManager` examples.

## Example 1. Download File, View All Download, Delete Download

In this complete example we want to see how to download a file from the internet using the downloadManager class. Then we can open the donwload by clicking the notification in the system bar or from internally in our app. Moreover we can delete the file, view all downloads etc.

#### Video Tutorial

Here we have a video tutorial for this example.

#### Demo

Here's the demo of the app.

![](https://github.com/Oclemy/MrDownloadManager/raw/master/demo/demo1.gif)

#### OverView of the App

1. User clicks the download button.
2. Download starts.
3. Meanwhile the progress is shown in the status bar as a notification. The notification also includes the title and description of the download.
4. The user is notified via the system status bar text when the download is complete.
5. When user clicks the notification the file is opened. If it is not found then a toast message is shown.
6. When user clicks `View All` button then the view for displaying all the downloads is shown. You may have some other downloads enqueued there, some not from your application.
7. When user clicks the `Delete` button then our download whether partial or complete gets deleted.

##### (a). MainActivity.java

`MainActivity` as you can imagine is our launcher activity. it will derive from the `AppCompatActivity`. This is where we write all our code. But first we start by making several imports. These include:

1. `DownloadManager` - The class responsible for allowing us use the system download manahger.
2. Intent - Class responsible for allowing us open the system download manager view.
3. Uri - Allows us to parse a string url into a Uri from which our file can be downloaded.
4. Environment - Allow us specify the public directory where our downloaded file will be stored.
5. Toast - Allow us to show quick messages.

**HowTo's**

Let's look at several howTos.

**(a). How to Initialize the DownloadManager**

As a System service, the `DownloadManager` is not instantiated directly. Instead we will initialize it using the `getSystemService()` method and cast the resultant object into the `DownloadManager` class.

```java
    private void initializeDownloadManager() {
        downloadManager= (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
    }
```

**(b). How to Create a Download Request**

Inside the DownloadManager class is an inner class called the `Request` class. We can use this class to define our HTTP Request. We conveniently do this via the builder patter.

```java
        DownloadManager.Request request=new DownloadManager.Request(Uri.parse("https://raw.githubusercontent.com/Oclemy/SampleJSON/master/spacecrafts/voyager.jpg"));
        request.setTitle("Voyager")
                .setDescription("File is downloading...")
                .setDestinationInExternalFilesDir(this,
                        Environment.DIRECTORY_DOWNLOADS,fileName)
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
```

Clearly you can see we've pased the `Uri` into our `Request` constructor. Then set the title, descrription, destination and notification visibility.

**(c). How to enqueue a Download**

Enqueueing a download means adding it to the download queue of the download manager. Then the queue will be processed automatically the system. You enqueue a download using the `enqueue()` method.

```java
        downLoadId=downloadManager.enqueue(request);
```

This will return us a download id.

**(d). How to remove/delete downloaded file**

Well you can remove a downloaded file from the download manager using the `remove()` method of the `DownloadManager` class. You pass the download id.

```java
    private void deleteDownloadedFile(){
        downloadManager.remove(downLoadId);
    }
```

Here's the full source code.

```java
package info.camposha.mrdownloadmanager;

import android.app.DownloadManager;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import java.io.FileNotFoundException;

public class MainActivity extends AppCompatActivity {

    private DownloadManager downloadManager;
    private String fileName=null;
    private long downLoadId;

    /**
     * Initialize download manager
     */
    private void initializeDownloadManager() {
        downloadManager= (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        fileName="Voyager";
    }

    /**
     * Set the title and desc of this download, to be displayed in notifications.
     */
    private void downloadFile(){
        DownloadManager.Request request=new DownloadManager.Request(Uri.parse("https://raw.githubusercontent.com/Oclemy/SampleJSON/master/spacecrafts/voyager.jpg"));
        request.setTitle("Voyager")
                .setDescription("File is downloading...")
                .setDestinationInExternalFilesDir(this,
                        Environment.DIRECTORY_DOWNLOADS,fileName)
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        //Enqueue the download.The download will start automatically once the download manager is ready
        // to execute it and connectivity is available.
        downLoadId=downloadManager.enqueue(request);
    }

    /**
     * Cancel downloads and remove them from the download manager.
     * If there is a downloaded file, partial or complete, it is deleted.
     */
    private void deleteDownloadedFile(){
        downloadManager.remove(downLoadId);
    }
    private void openOurDownload(){
       //we can open download here
    }

    /**
     * View all downloads in the downloadmanager
     */
    private void viewAllDownloads(){
        Intent intent=new Intent();
        intent.setAction(DownloadManager.ACTION_VIEW_DOWNLOADS);
        startActivity(intent);
    }

    /**
     * Handle button clicks
     * @param view
     */
    public void clickView(View view){
        switch (view.getId()){
            case R.id.downloadBtn:
                downloadFile();
                break;
            case R.id.openDownloadBtn:
                openOurDownload();
                break;
            case R.id.viewDownloadsBtn:
                viewAllDownloads();
                break;
            case R.id.deleteBtn:
                deleteDownloadedFile();
                break;
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeDownloadManager();
    }
}
```

##### (b). activity_main.xml

We need a layout for our `MainActivity`. Here's the code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

android_layout_width="match_parent"
android_layout_height="match_parent"
    android_orientation="vertical"
android_background="#009688"
tools_context=".MainActivity">

<TextView
    android_id="@+id/headerTxt"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    android_text="DownloadManager Example"
    android_textAlignment="center"
    android_fontFamily="casual"
    android_textStyle="bold"
    android_textAppearance="@style/TextAppearance.AppCompat.Large"
    android_textColor="@color/white" />

<ImageView
    android_layout_width="match_parent"
    android_layout_height="300dp"
    android_layout_centerHorizontal="true"
    android_src="@drawable/logo"
    android_contentDescription="@string/app_name"/>

<LinearLayout
    android_id="@+id/button_zone"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    android_orientation="horizontal"
    android_layout_centerInParent="true">

    <Button
        android_id="@+id/downloadBtn"
        style="?android:attr/button"
        android_layout_width="0dp"
        android_layout_height="wrap_content"
        android_layout_weight="1"
        android_onClick="clickView"
        android_text="Download" />
    <Button
        android_id="@+id/viewDownloadsBtn"
        style="?android:attr/button"
        android_layout_width="0dp"
        android_layout_height="wrap_content"
        android_layout_weight="1"
        android_onClick="clickView"
        android_text="View All" />
</LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal"
        android_layout_centerInParent="true">
    <Button
        android_id="@+id/openDownloadBtn"
        style="?android:attr/button"
        android_layout_width="0dp"
        android_layout_height="wrap_content"
        android_layout_weight="1"
        android_onClick="clickView"
        android_text="Open" />

        <Button
            android_id="@+id/deleteBtn"
            style="?android:attr/button"
            android_layout_width="0dp"
            android_layout_height="wrap_content"
            android_layout_weight="1"
            android_onClick="clickView"
            android_text="Delete" />

</LinearLayout>

</LinearLayout>
```

##### (c). AndroidManifest.xml

In our AndroidManifest we need to add permissions for internet connectivity as well as for writing to external storage. This is because we download our image from internet and write to our external storage.

Here's my full `AndroidManifest.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.mrdownloadmanager">

    <uses-permission android_name="android.permission.INTERNET"/>
    <uses-permission android_name="android.permission.WRITE_EXTERNAL_STORAGE"/>

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
    </application>

</manifest>
```

##### Download

Here are reference resources:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MrDownloadManager/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MrDownloadManager) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=E2JStMkhAIg) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Example 2: Kotlin Android simple DownloadManager Example

A simple open source Kotlin downloadmanager example suitable for absolute beginners.

### Step 1: Create Project

Start by creating an empty AndroidStudio project.

### Step 2: Dependencies

No special third party library is needed for this project.

### Step 3: Design Layout

Design you MainActivity layout by adding a textview in a ConstraintLayout as shown below:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Start by adding imports:

```kotlin
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.opengl.Visibility
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
```

Create `MainActivity` by extending `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Define a download ID:

```kotlin
    var downloadid: Long = 0
```

Override `onCreate()` callback:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Create an annonymouse BroadcastReceiver and inside it override the `onReceive()` as follows:

```kotlin
        val new = object: BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val id = intent?.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
                if (id == downloadid) Log.d("DOWNLOAD", "DONE")
            }
        }
```

Create a Download Uri:

```kotlin
        val uri = Uri.parse("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")
```

Initialize a DownloadRequest:

```kotlin
        val request = DownloadManager.Request(uri).setDescription("DummyFile").setTitle("Dummy").setAllowedOverMetered(true).setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)
```

Enqueue the Download:

```kotlin
        val location = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        downloadid = location.enqueue(request)
```

Register the BroadcastReceiver:

```kotlin
        registerReceiver(new, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.opengl.Visibility
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {

    var downloadid: Long = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val new = object: BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val id = intent?.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
                if (id == downloadid) Log.d("DOWNLOAD", "DONE")
            }
        }

        val uri = Uri.parse("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")

        val request = DownloadManager.Request(uri).setDescription("DummyFile").setTitle("Dummy").setAllowedOverMetered(true).setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)

        val location = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        downloadid = location.enqueue(request)

        registerReceiver(new, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
    }
}
```

### Step 5: Add permissions

In your `AndroidManifest` add the following permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE"/>
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/BlasQu/downloadmanagertests/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/BlasQu/) code author |

## Example 3: Kotlin Android - Dynamic Download

In this example you learn how to download from any link. The link is provided at runtime via an EditText.

### Step 1: Create Project

Start by creating an empty AndroidStudio project.

### Step 2: Dependencies

No third party dependency is needed for this project.

### Step 3: Design Layout

Add an EditText and Button in your mainactivity's layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/tilLink"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"

        android:hint="Введите ссылку"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etLink"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnLoad"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="load"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tilLink" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Start by adding imports to your `MainActivity.kt` as follows:

```kotlin
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.view.Gravity
import android.widget.PopupMenu
import android.widget.Toast
import com.google.android.material.textfield.TextInputEditText
```

Create the Activity:

```kotlin
class MainActivity : AppCompatActivity() {
```

Define instance fields:

```kotlin
    private var binding: ActivityMainBinding? = null
    private var dm: DownloadManager? = null
```

Create an annonymouse BroadcastReceiver class and implement the `onReceive()` method as follows:

```kotlin
    private val broadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            val action = intent?.action
            if (DownloadManager.ACTION_DOWNLOAD_COMPLETE == action) {
                Toast.makeText(context, "Download Completed", Toast.LENGTH_SHORT).show()
            }
        }
    }
```

Setup event handlers:

```kotlin
    private fun setupListeners() {
        binding?.btnLoad?.setOnLongClickListener {
            val popup = PopupMenu(this, it)
            popup.inflate(R.menu.popup)
            popup.show()
            download()
            false
        }
    }
```

Here is the function that downloads the item:

```kotlin
    private fun download() {
        dm?.enqueue(
                DownloadManager.Request(Uri.parse(LINK_VIDEO))
                        .setAllowedNetworkTypes(
                                DownloadManager.Request.NETWORK_MOBILE or
                                        DownloadManager.Request.NETWORK_WIFI
                        )
                        .setTitle("Download File.mp4")
                        .setDescription("This is very important file")
                        .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
//                        .setDestinationInExternalFilesDir(
//                                applicationContext , Environment.DIRECTORY_DOWNLOADS,   "managerDownload24.mp4"
//                        )
                        .setDestinationInExternalPublicDir(
                                Environment.DIRECTORY_DOWNLOADS,
                                "managerDownload24"
                        )
        )
    }
```

Unregister the BroadcastReceiver in the `onCreate()`:

```kotlin
    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(broadcastReceiver)
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.view.Gravity
import android.widget.PopupMenu
import android.widget.Toast
import com.google.android.material.textfield.TextInputEditText
import ru.trinitydigital.downloadmanager.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private var binding: ActivityMainBinding? = null
    private var dm: DownloadManager? = null

    private val broadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            val action = intent?.action
            if (DownloadManager.ACTION_DOWNLOAD_COMPLETE == action) {
                Toast.makeText(context, "Download Completed", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding?.root)
        registerReceiver(broadcastReceiver, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
        dm = getSystemService(DOWNLOAD_SERVICE) as DownloadManager

        setupListeners()
    }

    private fun setupListeners() {
        binding?.btnLoad?.setOnLongClickListener {
            val popup = PopupMenu(this, it)
            popup.inflate(R.menu.popup)
            popup.show()
            download()
            false
        }
    }

    private fun download() {
        dm?.enqueue(
                DownloadManager.Request(Uri.parse(LINK_VIDEO))
                        .setAllowedNetworkTypes(
                                DownloadManager.Request.NETWORK_MOBILE or
                                        DownloadManager.Request.NETWORK_WIFI
                        )
                        .setTitle("Download File.mp4")
                        .setDescription("This is very important file")
                        .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
//                        .setDestinationInExternalFilesDir(
//                                applicationContext , Environment.DIRECTORY_DOWNLOADS,   "managerDownload24.mp4"
//                        )
                        .setDestinationInExternalPublicDir(
                                Environment.DIRECTORY_DOWNLOADS,
                                "managerDownload24"
                        )
        )
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(broadcastReceiver)
    }

    companion object {
        private const val LINK_VIDEO = "https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8anBnfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    }
}
```

### Android Manifest

In the `AndroidManifest.xml` add the following permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/rojsashaItacademy/downloadmanager/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/rojsashaItacademy/) code author |

## Example 4: Kotlin DownloadManager with Runtime Permissions and Coroutines

Here is yet another DownloadManager example written in Kotlin. This utilizes Kotlin Coroutines. It also involves checking for necessary permissions at runtime before the download.

### Step 1: Create Project

Start by creating an empty `AndroidStudio` project.

### Step 2: Dependencies

No third party dependency is used.

### Step 3: Design Layout

Design a simple layout with a button and a textview:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"

    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_centerVertical="true"
        android:gravity="center"
        android:orientation="vertical">

        <TextView
            android:id="@+id/text_view"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:padding="12dp"
            android:textColor="@color/black"
            android:textSize="25sp" />

        <Button
            android:id="@+id/download_btn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:padding="12dp"
            android:text="DOWNLOAD PDF"
            android:textColor="@android:color/white" />

    </LinearLayout>

</RelativeLayout>
```

### Step 4: Write Code

Start by adding imports:

```kotlin
import android.Manifest
import android.annotation.TargetApi
import android.app.DownloadManager
import android.content.Context
import android.content.pm.PackageManager
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
```

Extend the `AppCompatActivity`:\`

```kotlin
class MainActivity : AppCompatActivity() {
```

Then define a download URL as an instance field:

```kotlin
    private var imageUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
```

Override the `onCreate()`:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

When the download button is clicked, before initiating download we check for permission:

```kotlin
        download_btn.setOnClickListener {
            // After API 23 (Marshmallow) and lower Android 10 you need to ask for permission first before save an image
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
                askPermissions()
            } else {
                downloadImage(imageUrl)
            }
        }
```

If granted we initiate the download.

Here is the function to initiate download the image:

```kotlin
    private fun downloadImage(url: String) {
        val downloadManager = this.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager

        val downloadUri = Uri.parse(url)

        val request = DownloadManager.Request(downloadUri).apply {
            setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE)
                .setAllowedOverRoaming(false)
                .setTitle(url.substring(url.lastIndexOf("/") + 1))
                .setDescription("abc")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                .setDestinationInExternalPublicDir(
                    Environment.DIRECTORY_DOWNLOADS,
                    url.substring(url.lastIndexOf("/") + 1)
                )

        }
        //use when just to download the file with getting status
        //downloadManager.enqueue(request)

        val downloadId = downloadManager.enqueue(request)
        val query = DownloadManager.Query().setFilterById(downloadId)

        lifecycleScope.launchWhenStarted {
            var lastMsg: String = ""
            var downloading = true
            while (downloading) {
                val cursor: Cursor = downloadManager.query(query)
                cursor.moveToFirst()
                if (cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)) == DownloadManager.STATUS_SUCCESSFUL) {
                    downloading = false
                }
                val status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS))
                val msg: String? = statusMessage(url, File(Environment.DIRECTORY_DOWNLOADS), status)
                Log.e("DownloadManager", " Status is :$msg")
                if (msg != lastMsg) {
                    withContext(Dispatchers.Main) {
                        // Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
                        text_view.text = msg
                        //Log.e("DownloadManager", "Status is :$msg")
                    }
                    lastMsg = msg ?: ""
                }
                cursor.close()
            }
        }
    }
```

Here is the function that constructs and returns the Download status as a string that can be displayed to the user:

```kotlin
    private fun statusMessage(url: String, directory: File, status: Int): String? {
        var msg = ""
        msg = when (status) {
            DownloadManager.STATUS_FAILED -> "Download has been failed, please try again"
            DownloadManager.STATUS_PAUSED -> "Paused"
            DownloadManager.STATUS_PENDING -> "Pending"
            DownloadManager.STATUS_RUNNING -> "Downloading..."
            DownloadManager.STATUS_SUCCESSFUL -> "PDF downloaded successfully in $directory" + File.separator + url.substring(
                url.lastIndexOf("/") + 1
            )
            else -> "There's nothing to download"
        }
        return msg
    }
```

The following function will allow you to ask for the necessary permissions before we proceed with the download:

```kotlin
    @TargetApi(Build.VERSION_CODES.M)
    fun askPermissions() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            // Permission is not granted
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
                )
            ) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                AlertDialog.Builder(this)
                    .setTitle("Permission required")
                    .setMessage("Permission required to save photos from the Web.")
                    .setPositiveButton("Allow") { dialog, id ->
                        ActivityCompat.requestPermissions(
                            this,
                            arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                            MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE
                        )
                        finish()
                    }
                    .setNegativeButton("Deny") { dialog, id -> dialog.cancel() }
                    .show()
            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                    MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE
                )
                // MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE is an
                // app-defined int constant. The callback method gets the
                // result of the request.

            }
        } else {
            // Permission has already been granted
            downloadImage(imageUrl)
        }
    }
```

Then handle the permission request resulytusing the following callback:

```kotlin
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE -> {
                // If request is cancelled, the result arrays are empty.
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!
                    // Download the Image
                    downloadImage(imageUrl)
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.

                }
                return
            }
            // Add other 'when' lines to check for other
            // permissions this app might request.
            else -> {
                // Ignore all other requests.
            }
        }
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.Manifest
import android.annotation.TargetApi
import android.app.DownloadManager
import android.content.Context
import android.content.pm.PackageManager
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File

class MainActivity : AppCompatActivity() {
    private var imageUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    //private var imageUrl = "http://10.0.2.2:8087/getFile"

    //private var imageUrl = "https://www.orimi.com/pdf-test.pdf"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        download_btn.setOnClickListener {
            //http://localhost:8087/getFile
            //downloadImage("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")
            //downloadImage("http://localhost:8087/getFile")
            // After API 23 (Marshmallow) and lower Android 10 you need to ask for permission first before save an image
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
                askPermissions()
            } else {
                downloadImage(imageUrl)
            }
        }
    }

    private fun downloadImage(url: String) {
        //val directory = File(Environment.DIRECTORY_PICTURES)

//        if (!directory.exists()) {
//            directory.mkdirs()
//        }

        val downloadManager = this.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager

        val downloadUri = Uri.parse(url)

        val request = DownloadManager.Request(downloadUri).apply {
            setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE)
                .setAllowedOverRoaming(false)
                .setTitle(url.substring(url.lastIndexOf("/") + 1))
                .setDescription("abc")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                .setDestinationInExternalPublicDir(
                    Environment.DIRECTORY_DOWNLOADS,
                    url.substring(url.lastIndexOf("/") + 1)
                )

        }
        //use when just to download the file with getting status
        //downloadManager.enqueue(request)

        val downloadId = downloadManager.enqueue(request)
        val query = DownloadManager.Query().setFilterById(downloadId)

        lifecycleScope.launchWhenStarted {
            var lastMsg: String = ""
            var downloading = true
            while (downloading) {
                val cursor: Cursor = downloadManager.query(query)
                cursor.moveToFirst()
                if (cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)) == DownloadManager.STATUS_SUCCESSFUL) {
                    downloading = false
                }
                val status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS))
                val msg: String? = statusMessage(url, File(Environment.DIRECTORY_DOWNLOADS), status)
                Log.e("DownloadManager", " Status is :$msg")
                if (msg != lastMsg) {
                    withContext(Dispatchers.Main) {
                        // Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
                        text_view.text = msg
                        //Log.e("DownloadManager", "Status is :$msg")
                    }
                    lastMsg = msg ?: ""
                }
                cursor.close()
            }
        }
    }

    private fun statusMessage(url: String, directory: File, status: Int): String? {
        var msg = ""
        msg = when (status) {
            DownloadManager.STATUS_FAILED -> "Download has been failed, please try again"
            DownloadManager.STATUS_PAUSED -> "Paused"
            DownloadManager.STATUS_PENDING -> "Pending"
            DownloadManager.STATUS_RUNNING -> "Downloading..."
            DownloadManager.STATUS_SUCCESSFUL -> "PDF downloaded successfully in $directory" + File.separator + url.substring(
                url.lastIndexOf("/") + 1
            )
            else -> "There's nothing to download"
        }
        return msg
    }

    @TargetApi(Build.VERSION_CODES.M)
    fun askPermissions() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            // Permission is not granted
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
                )
            ) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                AlertDialog.Builder(this)
                    .setTitle("Permission required")
                    .setMessage("Permission required to save photos from the Web.")
                    .setPositiveButton("Allow") { dialog, id ->
                        ActivityCompat.requestPermissions(
                            this,
                            arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                            MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE
                        )
                        finish()
                    }
                    .setNegativeButton("Deny") { dialog, id -> dialog.cancel() }
                    .show()
            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                    MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE
                )
                // MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE is an
                // app-defined int constant. The callback method gets the
                // result of the request.

            }
        } else {
            // Permission has already been granted
            downloadImage(imageUrl)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE -> {
                // If request is cancelled, the result arrays are empty.
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!
                    // Download the Image
                    downloadImage(imageUrl)
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.

                }
                return
            }
            // Add other 'when' lines to check for other
            // permissions this app might request.
            else -> {
                // Ignore all other requests.
            }
        }
    }

    companion object {
        private const val MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE = 1
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/amitsalunke01/DownloadManager/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/amitsalunke01/) code author |
