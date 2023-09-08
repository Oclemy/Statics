# Android Service Tutorial and Examples


_A service is an android application component_ that represents:

1. An applications desire to perform long running operations while not interacting with the user.
2. A component to supply functionality to other applications.


#### When should I use a Service?

Use a service if you have a long running operation or a task that has a long lifecycle. It's a good design that long running operations be executed in the background.

An example is a background data synchronization task.

In that type of task you can create a service that runs periodically or as needed. You can make use of a system alarm.

Then your service can terminate when the task is over.

Doing the job in the background frees up the main thread from having to do these tasks thus preventing the user interface from being frozen whenever an intensive tasks is being executed.

Even though we can just spin off a new thread even inside an activity, a much better and cleaner way is to delegate the background operations to a service.

#### Where does the Service run?

All android components, service included do run in the main thread of the application process.

Service's lifecycle is different from Activity's liefcycle. Th former is better adapted to handle long running operations than the latter.

Once we've moved our long running operations to a background thread, we can start and handle that thread inside the service.

Long running operations that don't require the user interactions are the best candidate for delegation to a service.

#### Advantages of a Service

1. Service provides a more efficient mechanism for us to decouple long running operations from the user interface.

#### Example Usages of a Service

##### (a). Services without user input

1. Apps that utilize network frequently to poll for updates.
2. Music playing app.
3. Messaging application.

##### (b). Services with user input

1. Photo sharing app.

#### Quick Service Snippets and HowTos

##### 1\. How to Start a Service

In the first example we have been given the classname:

```java
    public static void startService(String className) {
        try {
            startService(Class.forName(className));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

In the second example we have been give the Class itself and the context:

```java
   public static void startService(Class<?> cls, Context context) {
        Intent intent = new Intent(context, cls);
        context.startService(intent);
    }
```

##### 2\. How to Stop a Service

Let's say you want to stop a service and you've been provided the class name:

```java
    public static boolean stopService(String className) {
        try {
            return stopService(Class.forName(className));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
```

What about if you've been provided the class itself:

```java
    public static boolean stopService(Class<?> cls, Context context) {
        Intent intent = new Intent(context, cls);
        return context.stopService(intent);
    }
```

##### 3\. How to Bind a Service

WE have two examples. Here's the first one:

```java
    public static void bindService(String className, ServiceConnection conn, int flags) {
        try {
            bindService(Class.forName(className), conn, flags);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

then the second example:

```java
    public static void bindService(Class<?> cls, ServiceConnection conn, int flags,Context context) {
        Intent intent = new Intent(context, cls);
       context.bindService(intent, conn, flags);
    }
```

##### 4\. How to UnBind a Service

```java
    public static void unbindService(ServiceConnection conn,Context context) {
        context.unbindService(conn);
    }
```

#### 5\. How to get All running Services

You want to obtain all running services in the system and return their names as a `Set`.

```java
    public static Set getAllRunningService(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<RunningServiceInfo> info = activityManager.getRunningServices(0x7FFFFFFF);
        Set<String> names = new HashSet<>();
        if (info == null || info.size() == 0) return null;
        for (RunningServiceInfo aInfo : info) {
            names.add(aInfo.service.getClassName());
        }
        return names;
    }
```

## Example 1: Bound Service to Get time

This is a simple Bound service example. We get the current local time in the device and show it. The service is responsible for getting the time.

Here's the screenshot of what is created:

![BoundService Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/BoundService-Example.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependencies are needed for this project.

### Step 3: Design Layout

Design a simple layout with a button at the center and some TextViews:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout tools:context="com.example.ankitkumar.boundservice.MainActivity" android:background="#efedef" android:layout_height="match_parent" android:layout_width="match_parent" android:id="@+id/activity_main" xmlns:tools="http://schemas.android.com/tools" xmlns:android="http://schemas.android.com/apk/res/android">

<TextView android:layout_height="wrap_content" android:layout_width="100sp" android:id="@+id/tv_time" android:visibility="gone" android:textStyle="bold" android:textSize="18sp" android:textColor="@android:color/background_dark" android:text="@string/time" android:gravity="end" android:fontFamily="sans-serif-condensed" android:layout_marginTop="40sp"/>

<TextView android:layout_height="wrap_content" android:layout_width="140sp" android:id="@+id/tv_date" android:visibility="gone" android:textStyle="bold" android:textSize="18sp" android:textColor="@android:color/background_dark" android:text="@string/date" android:gravity="bottom" android:fontFamily="sans-serif-condensed" android:layout_marginTop="40sp" android:layout_alignParentRight="true" android:layout_alignParentEnd="true"/>

<TextView android:layout_height="wrap_content" android:layout_width="match_parent" android:id="@+id/textView_current_time" android:textSize="36sp" android:textColor="#ee6f64" android:gravity="center" android:fontFamily="sans-serif-condensed" android:layout_marginTop="70dp" android:hint="@string/time_label" android:layout_centerHorizontal="true"/>

<Button android:background="#e54048" android:layout_height="60sp" android:layout_width="200sp" android:id="@+id/button_start_service" android:textStyle="bold" android:textSize="18sp" android:textColor="#ffff" android:text="@string/show_time" android:fontFamily="sans-serif-condensed" android:onClick="getcurrenttime" android:layout_centerInParent="true"/>

</RelativeLayout>
```

### Step 4: Create a BoundService

This service will be responsible for getting current time and returning it.

Start by creating the `BoundService.java` and add the following imports:

```java
        import android.app.Service;
        import android.content.Intent;
        import android.os.Binder;
        import android.os.IBinder;

        import java.text.SimpleDateFormat;
        import java.util.Date;
        import java.util.Locale;
```

Then extend the `Service` with one instance field:

```java
public class BoundService extends Service {
        //Base interface for a remotable object, the core part of a lightweight remote procedure call mechanism
    private final IBinder myBinder = new MyLocalBinder();
```

Now override the `onBind()` and return the above instantiated `IBinder` object:

```java
    @Override
    public IBinder onBind(Intent arg0) {
        return myBinder;
    }
```

Now define our method to get the current local time:

```java
    public String getCurrentTime() {
        SimpleDateFormat dateformat = new SimpleDateFormat("HH:mm:ss  dd/MMM/yyyy", Locale.US);
        return (dateformat.format(new Date()));
    }
```

Here's the full code:

**BoundService.java**

```java
        import android.app.Service;
        import android.content.Intent;
        import android.os.Binder;
        import android.os.IBinder;

        import java.text.SimpleDateFormat;
        import java.util.Date;
        import java.util.Locale;

public class BoundService extends Service {

    //Base interface for a remotable object, the core part of a lightweight remote procedure call mechanism
    private final IBinder myBinder = new MyLocalBinder();

    //Binding Service
    @Override
    public IBinder onBind(Intent arg0) {
        // TODO Auto-generated method stub
        return myBinder;
    }

    //Formatting and parsing dates in a locale-sensitive manner
    public String getCurrentTime() {
        SimpleDateFormat dateformat = new SimpleDateFormat("HH:mm:ss  dd/MMM/yyyy", Locale.US);
        return (dateformat.format(new Date()));
    }

    class MyLocalBinder extends Binder {
        BoundService getService() {
            return BoundService.this;
        }
    }
}
```

### Step 5: Create Activity

We will come to the activity that will render our time as well as setup our Service:

**MainActivity.java**

```java
       import android.content.ComponentName;
        import android.content.Context;
        import android.content.Intent;
        import android.content.ServiceConnection;
        import android.os.Bundle;
        import android.os.IBinder;
        import android.support.v7.app.AppCompatActivity;
        import android.view.View;
        import android.widget.Button;
        import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    BoundService myService;
    boolean isBound = false;

    TextView currenttime, time, date;
    Button btn_start_service;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set the activity content from a layout resource
        setContentView(R.layout.activity_main);
        time = (TextView) findViewById(R.id.tv_time);
        date = (TextView) findViewById(R.id.tv_date);
        currenttime = (TextView) findViewById(R.id.textView_current_time);
        btn_start_service = (Button) findViewById(R.id.button_start_service);
        Intent intent = new Intent(MainActivity.this, BoundService.class);

        /*
        Connect to an application service
        Automatically create the service as long as the binding exists
        */
        bindService(intent, myConnection, Context.BIND_AUTO_CREATE);
    }

    public void getcurrenttime(View view) {
        currenttime.setText(myService.getCurrentTime());
        time.setVisibility(View.VISIBLE);
        date.setVisibility(View.VISIBLE);
    }

    //Setting Up BoundService
    private ServiceConnection myConnection = new ServiceConnection() {

        //Service Connected
        public void onServiceConnected(ComponentName className,
                                       IBinder service) {
            BoundService.MyLocalBinder binder = (BoundService.MyLocalBinder) service;
            myService = binder.getService();
            isBound = true;
        }

        //Service is Disconnected
        public void onServiceDisconnected(ComponentName arg0) {
            isBound = false;
        }

    };

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment17.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Quick Service Examples

##### 1\. How to Load Songs into an ArrayList in a Service

We have to do this in a background thread as we don't wish to freeze our user interface.

We will log these songs but of course you can render them in a [recyclerview](https://camposha.info/android/recyclerview) or [listview](https://camposha.info/android/listview) and implement a class to play them.

First let's start by defining a Song object. This is our Song bean class:

```java
public final class Song {

    private String name;

    private String artist;

    private String coverUri;

    private long time;

    private String location;

    public String getName() {
        return name;
    }

    public Song setName(String name) {
        this.name = name;
        return this;
    }

    public String getArtist() {
        return artist;
    }

    public Song setArtist(String artist) {
        this.artist = artist;
        return this;
    }

    public String getCoverUri() {
        return coverUri;
    }

    public Song setCoverUri(String coverUri) {
        this.coverUri = coverUri;
        return this;
    }

    public long getTime() {
        return time;
    }

    public Song setTime(long time) {
        this.time = time;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Song setLocation(String location) {
        this.location = location;
        return this;
    }

    @Override
    public String toString() {
        return String.format("name = %s, artist = %s, location = %s",
                name,
                artist,
                location);
    }
}
```

Then we proceed to create our Service.

You start by creating a class that implements the `Service`:

```java
public class ScanMusicService extends Service {...}
```

Normally when a service is created the `onCreate()` lifecycle method gets invoked by the system.

This is where we will start a thread that will scan our songs and load them into an arraylist in the background thread:

```java
    @Override
    public void onCreate() {
        super.onCreate();

        new Thread(new Runnable() {
            @Override
            public void run() {
                ArrayList<Song> songs = scanSongs(ScanMusicService.this);
                LogUtils.d(songs);
                ToastUtils.showLongToast(songs.toString());
            }
        }).start();

    }
```

The `scanSongs()` method will be responsible for scanning and filling our arraylist with songs.

Here's the full class:

```java
import android.app.Service;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.os.IBinder;
import android.provider.MediaStore;
import android.support.annotation.Nullable;

import com.jiangkang.tools.bean.Song;
import com.jiangkang.tools.utils.LogUtils;
import com.jiangkang.tools.utils.ToastUtils;

import java.util.ArrayList;

public class ScanMusicService extends Service {

    @Override
    public void onCreate() {
        super.onCreate();

        new Thread(new Runnable() {
            @Override
            public void run() {
                ArrayList<Song> songs = scanSongs(ScanMusicService.this);
                LogUtils.d(songs);
                ToastUtils.showLongToast(songs.toString());
            }
        }).start();

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        return super.onUnbind(intent);
    }

    private ArrayList<Song> scanSongs(Context context) {
        ArrayList<Song> result = new ArrayList<>();
        ContentResolver resolver = context.getContentResolver();
        Cursor cursor = resolver.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                null,
                null,
                null,
                null);
        if (cursor != null && !cursor.isClosed() && cursor.moveToFirst()) {
            while (cursor.moveToNext()) {
                String songName = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE));
                String artist = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
                String location = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));

                Song song = new Song();
                song.setName(songName)
                        .setArtist(artist)
                        .setLocation(location);
                LogUtils.d(song.toString());
                result.add(song);
            }
        }
        return result;
    }
}
```

And that's the class to help us in loading songs.

#### 2\. How to use System Download Manager and Service to download

We want to see how to create a service that can download data using the System DownloadManager.

Let's get right into it. First we start by creating an android service:

```java
public class DownloadService extends Service {
```

We then proceed to create several class and instance fields in that class:

```java
    private BroadcastReceiver receiver;
    private DownloadManager dm;
    private long enqueue;
    private String downloadUrl = "http://192.168.3.186/StaffAssistant.apk";
    private static String apkname = "StaffAssistant.apk";
```

They are:

1. BroadcastReceiver - our broadcast receiver instance.
2. DownloadManager - Our system download manager.
3. `enqueue`(long) - The unique download task id assigned by the system downloader, which can be used to query or process the download task through this id.
4. `Download URL` - url where to download the apk.
5. ApK name - application name

Remember we had extended the service and not yet implemented any of the methods we need to override. Here's one:

```java

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
```

We return `null` there and move over to our `onStartCommand()`.

```java
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        ....
```

There first and foremost we will receive our download url string via Intent.

We will then instantiate our BroadcastReceiver class and override the `onReceive()` method.

```java
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                install(context);
            }
        };
```

Inside the `onReceive()` method you can see we are invoking the `install()` method. That method is a custom method which we will create that will install our application.

Outside our `onReceive()` method we will register our BroadcastReceiver, since it's an android component.

```java
registerReceiver(receiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
```

Clearly you can see we've registered it programmatically given that we had created it as an annonymous class.

Then we invoke the `startDownload()` method, another custom method we will create later.

```java
startDownload ( downloadUrl );
```

[notice] Note that this requires an SD card write permissions. If you are using a targetSDKVersion greater or equal to 23, then you can use dynamic permission. [/notice]

Let's now see how to programmatically install the app after we've downloaded it.

First we create the `install()` method. It will receive a Context object which will allow us invoke the `startActivity()` method.

```java
    public static void install(Context context) {
```

Then we instantiate a java.io.File. We pass the path where we are creating the file and the filename:

```java
        File file = new File(
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                , apkname);
```

Then we create an Intent object:

```java
        Intent intent = new Intent(Intent.ACTION_VIEW);
```

Since the activity is not started in the Activity environment, set the following label:

```java
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
```

Whether the version is above 7.0.

```java
        if (Build.VERSION.SDK_INT >= 24) {
```

We then invoke the `getUriForFile()` method of the `FileProvider` class. These include:

1. Context.
2. Provider host address.
3. The file to install.

```java
            Uri apkUri =
                    FileProvider.getUriForFile(context, "com.hzecool.slhStaff.fileprovider", file);
            //Adding this sentence means temporarily authorizing the file represented by the Uri to the target application.
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        } else {
            intent.setDataAndType(Uri.fromFile(file),
                    "application/vnd.android.package-archive");
        }
        context.startActivity(intent);
    }
```

Then we come and override the `onDestroy()` method of the Service class.Here we are unregistering our BroadcastReceiver.

```java
    @Override
    public void onDestroy() {
        unregisterReceiver(receiver);
        super.onDestroy();
    }
```

Let's now see how to download. First let's create the `startDownload()` method:

```java
    private void startDownload(String downUrl) {
```

First let's get the system DownloadManager:

```java
        dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
```

We start by instanting the `DownloadManager.Request` class. While instantiating, we parse our download url using the `parse()` method of the `Uri` class, and pass it to our `Request` class:

```java
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downUrl));
```

Then we set our mime type or type of file as APK using the `setMimeType()` method:

```java
        request.setMimeType("application/vnd.android.package-archive");
```

Then we set the destination for our download using the `setDestinationInExternalPublicDir()`. In this case we use the downloads directory.

```java
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, apkname);
```

We invoke the `setNotificationVisibility()` to indicate whether a notification will be displayed when the download is complete.

```java
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
```

Then we set teh title

```java
        request.setTitle("Download new version");
```

Last but not least we perform the download and return the task unique id

```java
        enqueue = dm.enqueue(request);
    }
}
```

Here's the full code for the service:

```java
import android.app.DownloadManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.content.FileProvider;
import android.text.TextUtils;

import java.io.File;

public class DownloadService extends Service {
    private BroadcastReceiver receiver;
    private DownloadManager dm;
    private long enqueue;
    private String downloadUrl = "http://192.168.3.186/StaffAssistant.apk";
    private static String apkname = "StaffAssistant.apk";

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        downloadUrl = intent.getStringExtra("downloadUrl");
        if (TextUtils.isEmpty(downloadUrl)) {
            apkname = downloadUrl.substring(downloadUrl.lastIndexOf("/") + 1, downloadUrl.length());
        }
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                install(context);

            }
        };
        registerReceiver(receiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
        startDownload(downloadUrl);
        return Service.START_STICKY;
    }

    public static void install(Context context) {
        File file = new File(
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                , apkname);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (Build.VERSION.SDK_INT >= 24) {
            Uri apkUri =
                    FileProvider.getUriForFile(context, "com.hzecool.slhStaff.fileprovider", file);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        } else {
            intent.setDataAndType(Uri.fromFile(file),
                    "application/vnd.android.package-archive");
        }
        context.startActivity(intent);
    }

    @Override
    public void onDestroy() {
        unregisterReceiver(receiver);
        super.onDestroy();
    }

    private void startDownload(String downUrl) {
        dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downUrl));
        request.setMimeType("application/vnd.android.package-archive");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, apkname);
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        request.setTitle("Download new version");
        enqueue = dm.enqueue(request);
    }
}
```

### Full Service Examples

Let's look at full standalone examples you can download and run.

#### 1\. Simple Bound Service Example

[ui-tabs position="top-left" active="0" theme="default"]

[ui-tab title="MainActivity.java"] This is the main activity. This clas is deriving from the AppCompatActivity and is responsible for our user interface.

Here are some API definitions you may not know:

**(a). SeviceConnection**

This is an interface residing in the `android.content` package and ised for monitoring the state of an application service.

**(b). IBinder**

`IBinder` is the base interface for remotable objects, the core part of a lightweight remote procedure call mechanism designed for high performance when performing in-process and cross-process calls.

```java
package com.example.ankitkumar.boundservice;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    BoundService myService;
    boolean isBound = false;

    TextView currenttime, time, date;
    Button btn_start_service;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set the activity content from a layout resource
        setContentView(R.layout.activity_main);
        time = (TextView) findViewById(R.id.tv_time);
        date = (TextView) findViewById(R.id.tv_date);
        currenttime = (TextView) findViewById(R.id.textView_current_time);
        btn_start_service = (Button) findViewById(R.id.button_start_service);
        Intent intent = new Intent(MainActivity.this, BoundService.class);

        /*
        Connect to an application service
        Automatically create the service as long as the binding exists
        */
        bindService(intent, myConnection, Context.BIND_AUTO_CREATE);
    }

    public void getcurrenttime(View view) {
        currenttime.setText(myService.getCurrentTime());
        time.setVisibility(View.VISIBLE);
        date.setVisibility(View.VISIBLE);
    }

    //Setting Up BoundService
    private ServiceConnection myConnection = new ServiceConnection() {

        //Service Connected
        public void onServiceConnected(ComponentName className,
                                       IBinder service) {
            BoundService.MyLocalBinder binder = (BoundService.MyLocalBinder) service;
            myService = binder.getService();
            isBound = true;
        }

        //Service is Disconnected
        public void onServiceDisconnected(ComponentName arg0) {
            isBound = false;
        }

    };

}
```

[/ui-tab] [ui-tab title="BoundService.java"] This is our service subclass.

```java
package com.example.ankitkumar.boundservice;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class BoundService extends Service {

    //Base interface for a remotable object, the core part of a lightweight remote procedure call mechanism
    private final IBinder myBinder = new MyLocalBinder();

    //Binding Service
    @Override
    public IBinder onBind(Intent arg0) {
        // TODO Auto-generated method stub
        return myBinder;
    }

    //Formatting and parsing dates in a locale-sensitive manner
    public String getCurrentTime() {
        SimpleDateFormat dateformat = new SimpleDateFormat("HH:mm:ss  dd/MMM/yyyy", Locale.US);
        return (dateformat.format(new Date()));
    }

    class MyLocalBinder extends Binder {
        BoundService getService() {
            return BoundService.this;
        }
    }
}
```

**activity_main.xml**

The main activity layout.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout
    tools_context="com.example.ankitkumar.boundservice.MainActivity" android_background="#efedef" android_layout_height="match_parent" android_layout_width="match_parent" android_id="@+id/activity_main"  >

<TextView
    android_layout_height="wrap_content" android_layout_width="100sp" android_id="@+id/tv_time" android_visibility="gone" android_textStyle="bold" android_textSize="18sp" android_textColor="@android:color/background_dark" android_text="@string/time" android_gravity="end" android_fontFamily="sans-serif-condensed" android_layout_marginTop="40sp"/>

<TextView
    android_layout_height="wrap_content"
     android_layout_width="140sp" android_id="@+id/tv_date" android_visibility="gone" android_textStyle="bold" android_textSize="18sp" android_textColor="@android:color/background_dark" android_text="@string/date" android_gravity="bottom" android_fontFamily="sans-serif-condensed" android_layout_marginTop="40sp" android_layout_alignParentRight="true" android_layout_alignParentEnd="true"/>

<TextView
    android_layout_height="wrap_content" android_layout_width="match_parent" android_id="@+id/textView_current_time" android_textSize="36sp" android_textColor="#ee6f64" android_gravity="center" android_fontFamily="sans-serif-condensed" android_layout_marginTop="70dp" android_hint="@string/time_label" android_layout_centerHorizontal="true"/>

<Button
    android_background="#e54048" android_layout_height="60sp" android_layout_width="200sp" android_id="@+id/button_start_service" android_textStyle="bold" android_textSize="18sp" android_textColor="#ffff" android_text="@string/show_time" android_fontFamily="sans-serif-condensed" android_onClick="getcurrenttime" android_layout_centerInParent="true"/>

</RelativeLayout>
```

Download the code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/AnkitKumar111/Android_Assignment17.2/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/AnkitKumar111/Android_Assignment17.2) |
| 2. | GitHub | [Original Creator: @AnkitKumar111](https://github.com/AnkitKumar111) |

## Android IntentService

```java
public abstract class IntentService
extends Service
java.lang.Object
↳ android.content.Context
↳ android.content.ContextWrapper
↳ android.app.Service
↳ android.app.IntentService
```

IntentService is a base class for Services that handle asynchronous requests (expressed as Intents) on demand. Clients send requests through startService(Intent) calls; the service is started as needed, handles each Intent in turn using a worker thread, and stops itself when it runs out of work.

This "work queue processor" pattern is commonly used to offload tasks from an application's main thread. The IntentService class exists to simplify this pattern and take care of the mechanics. To use it, extend IntentService and implement onHandleIntent(Intent). IntentService will receive the Intents, launch a worker thread, and stop the service as appropriate.

All requests are handled on a single worker thread -- they may take as long as necessary (and will not block the application's main loop), but only one request will be processed at a time.
